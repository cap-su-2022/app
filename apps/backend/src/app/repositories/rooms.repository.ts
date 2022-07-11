import { Brackets, In, Like, Repository, UpdateResult } from 'typeorm';
import { RepositoryPaginationPayload } from '../models/search-pagination.payload';
import { Rooms } from '../models';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Accounts, Devices } from '../models';
import { ChooseBookingRoomFilterPayload } from '../payload/request/choose-booking-room-filter.payload';
import {
  IPaginationMeta,
  paginateRaw,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { RoomsPaginationParams } from '../controllers/rooms-pagination.model';
import { RoomType } from '../models/room-type.entity';
import { DataAddRequestPayload } from '../payload/request/data-add.request.payload';

@CustomRepository(Rooms)
export class RoomsRepository extends Repository<Rooms> {
  async getSize(): Promise<number> {
    const result = await this.createQueryBuilder(`rooms`)
      .select(`COUNT(id) as size`)
      .where(`rooms.deleted_at IS NULL`)
      .andWhere(`rooms.disabled_at IS NULL`)
      .getRawOne<{
        size: number;
      }>();
    return result.size;
  }

  async existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('rooms')
      .select('COUNT(rooms.name)')
      .where('rooms.id = :id', { id })
      .getRawOne()
      .then((data) => data['count'] > 0);
  }

  async checkIfRoomIsDeletedById(id: string): Promise<boolean> {
    return this.createQueryBuilder('rooms')
      .select('rooms.deleted_at')
      .where('rooms.id = :id', { id: id })
      .getRawOne<boolean>()
      .then((data) => (data ? data['deleted_at'] : true));
  }

  async checkIfRoomIsDisabledById(id: string): Promise<boolean> {
    return this.createQueryBuilder('rooms')
      .select('rooms.disabled_at')
      .where('rooms.id = :id', { id: id })
      .getRawOne<boolean>()
      .then((data) => (data ? data['disabled_at'] : true));
  }

  async isExistedByName(name: string): Promise<boolean> {
    return this.createQueryBuilder('rooms')
      .select('COUNT(rooms.name)')
      .where('rooms.name = :name', { name })
      .getRawOne()
      .then((data) => data['count'] > 0);
  }

  async findRoomNames(): Promise<Devices[]> {
    return this.createQueryBuilder('rooms')
      .select('rooms.name', 'name')
      .addSelect('rooms.id', 'id')
      .where('rooms.disabled_at IS NULL')
      .andWhere('rooms.deleted_at IS NULL')
      .getRawMany<Devices>();
  }

  async findById(id: string): Promise<Rooms> {
    return this.createQueryBuilder('rooms')
      .select('rooms.id', 'id')
      .addSelect('rooms.name', 'name')
      .addSelect('rt.id', 'roomTypeId')
      .addSelect('rt.name', 'roomTypeName')
      .addSelect('rooms.created_at', 'createdAt')
      .addSelect('a.username', 'createdBy')
      .addSelect('rooms.updated_at', 'updatedAt')
      .addSelect('aa.username', 'updatedBy')
      .addSelect('rooms.description', 'description')
      .innerJoin(Accounts, 'a', 'rooms.created_by = a.id')
      .innerJoin(Accounts, 'aa', 'rooms.updated_by = aa.id')
      .innerJoin(RoomType, 'rt', 'rt.id = rooms.type')
      .where('rooms.disabled_at IS NULL')
      .andWhere('rooms.deleted_at IS NULL')
      .andWhere('rooms.id = :roomId', { roomId: id })
      .getRawOne<Rooms>();
  }

  createNewRoom(
    payload: DataAddRequestPayload,
    userId: string
  ): Promise<Devices> {
    if (payload.isDisabled) {
      return this.save(
        {
          name: payload.name.trim(),
          description: payload.description,
          type: payload.type,
          createdBy: userId,
          createdAt: new Date(),
          disabledBy: userId,
          disabledAt: new Date(),
        },
        {
          transaction: true,
        }
      );
    } else {
      return this.save(
        {
          name: payload.name.trim(),
          description: payload.description,
          type: payload.type,
          createdBy: userId,
          createdAt: new Date(),
        },
        {
          transaction: true,
        }
      );
    }
  }

  async updateById(
    accountId: string,
    roomId: string,
    payload: DataAddRequestPayload
  ) {
    const oldData = await this.findOneOrFail({
      where: {
        id: roomId,
      },
    });
    return this.save(
      {
        ...oldData,
        id: roomId,
        name: payload.name.trim(),
        description: payload.description,
        type: payload.type,
        updatedBy: accountId,
        updatedAt: new Date(),
      },
      {
        transaction: true,
      }
    );
  }

  findDisabledRooms(search: string) {
    return this.createQueryBuilder('rooms')
      .select('rooms.id', 'id')
      .addSelect('rooms.name', 'name')
      .addSelect('rooms.disabled_at', 'disabledAt')
      .addSelect('a.username', 'disabledBy')
      .addSelect('rt.name', 'roomTypeName')
      .innerJoin(Accounts, 'a', 'rooms.disabled_by = a.id')
      .innerJoin(RoomType, 'rt', 'rooms.type = rt.id')
      .where(`rooms.deleted_at IS NULL`)
      .andWhere(`rooms.disabled_at IS NOT NULL`)
      .andWhere('rooms.name ILIKE :search', { search: `%${search.trim()}%` })
      .getRawMany<Rooms>();
  }

  getRoomsByRoomType(roomTypeId: string) {
    console.log('AAAAAAA: ', roomTypeId);
    return this.createQueryBuilder(`rooms`)
      .select('rooms.id', 'id')
      .addSelect('rooms.name', 'name')
      .addSelect('rooms.type', 'type')
      .addSelect('rt.name', 'roomTypeName')
      .innerJoin(RoomType, 'rt', 'rt.id = rooms.type')
      .where(`rooms.deleted_at IS NULL`)
      .andWhere(`rooms.disabled_at IS NULL`)
      .andWhere('rooms.type = :type', { type: roomTypeId })

      .getRawMany<Rooms>();
  }

  searchRoom(payload: RoomsPaginationParams) {
    const query = this.createQueryBuilder('r')
      .innerJoin(Accounts, 'a', 'r.created_by = a.id')
      .innerJoin(Accounts, 'aa', 'r.updated_by = aa.id')
      .select('r.id', 'id')
      .addSelect('r.name', 'name')
      .addSelect('r.description', 'description')
      .addSelect('rt.name', 'type')
      .addSelect('r.createdAt', 'createdAt')
      .addSelect('r.updatedAt', 'updatedAt')
      .addSelect('a.username', 'createdBy')
      .addSelect('aa.username', 'updatedBy')
      .innerJoin(RoomType, 'rt', 'rt.id = r.type')
      .where('LOWER(r.name) LIKE LOWER(:search)', {
        search: `%${payload.search.trim()}%`,
      })
      .andWhere(`r.deleted_at IS NULL`)
      .andWhere(`r.disabled_at IS NULL`)
      .orderBy(payload.sort, payload.dir as 'ASC' | 'DESC');
    if (payload.roomType && payload.roomType !== '') {
      query.andWhere('rt.name = :roomTypeName', {
        roomTypeName: payload.roomType,
      });
    }
    return paginateRaw<Rooms>(query, {
      limit: payload.limit,
      page: payload.page,
    });
  }

  async disableById(accountId: string, id: string) {
    const isDisabled = await this.createQueryBuilder('rooms')
      .update({
        disabledBy: accountId,
        disabledAt: new Date(),
      })
      .where('rooms.id = :id', { id: id })
      .useTransaction(true)
      .execute();
    if (isDisabled.affected > 0) {
      return this.findOneOrFail({
        where: {
          id: id,
        },
      });
    }
  }

  async restoreDisabledRoomById(accountId: string, id: string) {
    const isRestored = await this.createQueryBuilder('rooms')
      .update({
        disabledAt: null,
        disabledBy: null,
        updatedBy: accountId,
        updatedAt: new Date(),
      })
      .where('rooms.id = :id', { id: id })
      .useTransaction(true)
      .execute();
    if (isRestored.affected > 0) {
      return this.findOneOrFail({
        where: {
          id: id,
        },
      });
    }
  }

  async deleteById(accountId: string, id: string){
    const isDeleted = await this.createQueryBuilder('rooms')
      .update({
        deletedAt: new Date(),
        deletedBy: accountId,
        disabledAt: null,
        disabledBy: null,
      })
      .where('rooms.id = :id', { id: id })
      .useTransaction(true)
      .execute();
    if (isDeleted.affected > 0) {
      return this.findOneOrFail({
        where: {
          id: id,
        },
      });
    }
  }

  findDeletedRooms(search: string) {
    return this.createQueryBuilder(`rooms`)
      .select('rooms.id', 'id')
      .addSelect('rooms.name', 'name')
      .addSelect('rooms.deleted_at', 'deletedAt')
      .addSelect('a.username', 'deletedBy')
      .addSelect('rt.name', 'roomTypeName')
      .innerJoin(Accounts, 'a', 'rooms.deleted_by = a.id')
      .innerJoin(RoomType, 'rt', 'rt.id = rooms.type')
      .where(`rooms.deleted_at IS NOT NULL`)
      .andWhere(`rooms.disabled_at IS NULL`)
      .andWhere('rooms.name ILIKE :name', { name: `%${search.trim()}%` })
      .getRawMany<Rooms>();
  }

  async restoreDeletedRoomById(accountId: string, id: string){
    const isRestored = await this.createQueryBuilder('rooms')
      .update({
        deletedAt: null,
        deletedBy: null,
        updatedAt: new Date(),
        updatedBy: accountId,
      })
      .where('rooms.id = :id', { id: id })
      .execute();
      if (isRestored.affected > 0) {
        return this.findOneOrFail({
          where: {
            id: id,
          },
        });
      }
  }

  getAllRoomsForElasticIndex(): Promise<Rooms[]> {
    return this.createQueryBuilder('rooms')
      .select([
        'rooms.id',
        'rooms.name',
        'rooms.description',
        'rooms.isDeleted',
        'rooms.isDisabled',
      ])
      .getMany();
  }

  filterByNameAndType(payload: ChooseBookingRoomFilterPayload) {
    return this.createQueryBuilder('rooms')
      .select('rooms.id', 'id')
      .addSelect('rooms.name', 'name')
      .addSelect('rooms.type', 'type')
      .where('rooms.disabled_at IS NULL')
      .andWhere('rooms.deleted_at IS NULL')
      .andWhere('rooms.type LIKE :type', { type: `%${payload.roomType.name}%` })
      .andWhere('rooms.name LIKE :name', { name: `%${payload.roomName.name}%` })
      .orderBy('rooms.name', payload.roomName.sort)
      .addOrderBy('rooms.type', payload.roomType.sort)
      .getRawMany<Rooms>();
  }
}
