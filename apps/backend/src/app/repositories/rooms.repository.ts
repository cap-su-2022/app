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

  async isExistedById(id: string): Promise<boolean> {
    return this.createQueryBuilder('rooms')
      .select('COUNT(rooms.name)')
      .where('rooms.id = :id', { id })
      .getRawOne()
      .then((data) => data['count'] > 0);
  }

  async isExistedByName(name: string): Promise<boolean> {
    return this.createQueryBuilder('rooms')
      .select('COUNT(rooms.name)')
      .where('rooms.name = :name', { name })
      .getRawOne()
      .then((data) => data['count'] > 0);
  }

  findDisabledRooms(search: string) {
    return this.createQueryBuilder('rooms')
      .select('rooms.id', 'id')
      .addSelect('rooms.name', 'name')
      .addSelect('rooms.type', 'type')
      .addSelect('rooms.disabled_at', 'disabledAt')
      .addSelect('a.username', 'disabledBy')
      .innerJoin(Accounts, 'a', 'rooms.disabled_by = a.id')
      .where(`rooms.deleted_at IS NULL`)
      .andWhere(`rooms.disabled_at IS NOT NULL`)
      .andWhere('rooms.name LIKE :search', { search: `%${search}%` })
      .getRawMany<Rooms>();
  }

  findDeletedRooms(search: string): Promise<Rooms[]> {
    return this.createQueryBuilder(`rooms`)
      .select('rooms.deleted_at', 'deletedAt')
      .addSelect('a.username', 'deletedBy')
      .addSelect('rooms.name', 'name')
      .addSelect('rooms.type', 'type')
      .addSelect('rooms.id', 'id')
      .innerJoin(Accounts, 'a', 'a.id = rooms.deleted_by')
      .where(`rooms.deleted_at IS NOT NULL`)
      .andWhere(`rooms.disabled_at IS NULL`)
      .andWhere('rooms.name LIKE :name', { name: `%${search}%` })
      .getMany();
  }

  searchRoom(payload: RepositoryPaginationPayload) {
    const query = this.createQueryBuilder('r')
      .innerJoin(Accounts, 'a', 'r.created_by = a.id')
      .innerJoin(Accounts, 'aa', 'r.updated_by = aa.id')
      .select('r.id', 'id')
      .addSelect('r.name', 'name')
      .addSelect('r.description', 'description')
      .addSelect('r.type', 'type')
      .addSelect('r.createdAt', 'createdAt')
      .addSelect('r.updatedAt', 'updatedAt')
      .addSelect('a.username', 'createdBy')
      .addSelect('aa.username', 'updatedBy')

      .where(
        new Brackets((qb) =>
          qb
            .where('r.name LIKE :name', {
              name: `%${payload.search}%`,
            })
            .orWhere('r.description LIKE :description', {
              description: `%${payload.search}%`,
            })
        )
      )
      .andWhere(`r.deleted_at IS NULL`)
      .andWhere(`r.disabled_at IS NULL`);

    payload.direction.forEach((direction) =>
      query.addOrderBy(`r.${direction.name}`, direction.order)
    );

    return paginateRaw<Rooms>(query, {
      limit: payload.limit,
      page: payload.page,
    });
  }

  disableById(id: string) {
    return this.createQueryBuilder('rooms')
      .update({
        disabledBy: '',
        disabledAt: new Date(),
      })
      .where('rooms.id = :id', { id: id })
      .useTransaction(true)

      .execute();
  }

  restoreDisabledRoomById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('rooms')
      .update({
        disabledAt: null,
        disabledBy: null,
      })
      .where('rooms.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  deleteById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('rooms')
      .update({
        disabledAt: null,
        disabledBy: null,
        deletedBy: '',
        deletedAt: new Date(),
      })
      .where('rooms.id = :id', { id: id })
      .execute();
  }

  restoreDeletedRoomById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('rooms')
      .update({
        deletedAt: null,
        deletedBy: null,
      })
      .where('rooms.id = :id', { id: id })
      .execute();
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
      .addSelect('rooms.type', 'type')
      .addSelect('rooms.created_at', 'createdAt')
      .addSelect('a.username', 'createdBy')
      .addSelect('rooms.updated_at', 'updatedAt')
      .addSelect('aa.username', 'updatedBy')
      .addSelect('rooms.description', 'description')
      .innerJoin(Accounts, 'a', 'rooms.created_by = a.id')
      .innerJoin(Accounts, 'aa', 'rooms.updated_by = aa.id')
      .where('rooms.disabled_at IS NULL')
      .andWhere('rooms.deleted_at IS NULL')
      .andWhere('rooms.id = :roomId', { roomId: id })
      .getRawOne<Rooms>();
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
