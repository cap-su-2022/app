import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Repository, UpdateResult } from 'typeorm';
import { RoomType } from '../models/room-type.entity';
import { PaginationParams } from '../controllers/pagination.model';
import { Accounts } from '../models';
import { RoomTypeUpdateRequestPayload } from '../payload/request/room-type-update.request.payload';
import {
  IPaginationMeta,
  paginateRaw,
  Pagination,
} from 'nestjs-typeorm-paginate';

@CustomRepository(RoomType)
export class RoomTypeRepository extends Repository<RoomType> {
  findRoomTypesByPagination(
    pagination: PaginationParams
  ): Promise<Pagination<RoomType>> {
    const query = this.createQueryBuilder('rt')
      .select('rt.id', 'id')
      .addSelect('rt.name', 'name')
      .where('rt.deleted_at IS NULL')
      .andWhere('LOWER(rt.name) ILIKE :search', {
        search: `%${pagination.search}%`,
      })
      .orderBy(pagination.sort, pagination.dir as 'ASC' | 'DESC');

    return paginateRaw<RoomType>(query, {
      page: pagination.page,
      limit: pagination.limit,
    });
  }

  findRoomTypeName(): Promise<RoomType[]> {
    return this.createQueryBuilder('rt')
      .select('rt.id', 'id')
      .addSelect('rt.name', 'name')
      .andWhere('rt.disabled_at IS NULL')
      .andWhere("rt.deleted_at IS NULL")
      .getRawMany<RoomType>();
  }

  async findById(id: string): Promise<RoomType> {
    return this.createQueryBuilder('rt')
      .select('rt.id', 'id')
      .addSelect('rt.name', 'name')
      .addSelect('rt.description', 'description')
      .addSelect('a.username', 'createdBy')
      .addSelect('rt.created_at', 'createdAt')
      .addSelect('aa.username', 'updatedBy')
      .addSelect('rt.updated_at', 'updatedAt')
      .innerJoin(Accounts, 'a', 'a.id = rt.created_by')
      .innerJoin(Accounts, 'aa', 'aa.id = rt.updated_by')
      .where('rt.id = :id', { id: id })
      .andWhere('rt.deleted_at IS NULL')
      .getRawOne<RoomType>();
  }

  async deleteByIdAndAccountId(
    accountId: string,
    id: string
  ): Promise<UpdateResult> {
    return this.createQueryBuilder('rt')
      .update({
        deletedAt: new Date(),
        deletedBy: accountId,
      })
      .where('rt.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('rt')
      .select('COUNT(1)', 'count')
      .where('rt.id = :id', { id: id })
      .getRawOne()
      .then((data) => data?.count > 0);
  }

  restoreDisabledById(accountId: string, id: string) {
    return this.createQueryBuilder('rt')
      .update({
        updatedAt: new Date(),
        updatedBy: accountId,
      })
      .where('rt.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  restoreDeletedById(accountId: string, id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('room_type')
      .update({
        updatedAt: new Date(),
        updatedBy: accountId,
        deletedAt: null,
        deletedBy: null,
      })
      .where('room_type.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  deleteById(accountId: string, id: string) {
    return this.createQueryBuilder('room_type')
      .update({
        deletedAt: new Date(),
        deletedBy: accountId,
      })
      .where('room_type.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  findDisabledByPagination(search: string): Promise<RoomType[]> {
    return this.createQueryBuilder('rt')
      .select('rt.id', 'id')
      .addSelect('rt.name', 'name')
      .where('rt.name LIKE :search', { search: search })
      .andWhere('rt.disabled_at IS NOT NULL')
      .getRawMany<RoomType>();
  }

  findDeletedByPagination(search: string): Promise<RoomType[]> {
    return this.createQueryBuilder('rt')
      .select('rt.id', 'id')
      .addSelect('rt.name', 'name')
      .addSelect('rt.deleted_at', 'deletedAt')
      .addSelect('a.username', 'deletedBy')
      .innerJoin(Accounts, 'a', 'a.id = rt.deleted_by')
      .where('rt.name LIKE :search', { search: `%${search}%` })
      .andWhere('rt.deleted_at IS NOT NULL')
      .orderBy('rt.deleted_at', 'DESC')
      .getRawMany<RoomType>();
  }

  updateById(
    roomTypeId: string,
    accountId: string,
    payload: RoomTypeUpdateRequestPayload
  ) {
    return this.save(
      {
        id: roomTypeId,
        name: payload.name,
        description: payload.description,
        updatedBy: accountId,
        updatedAt: new Date(),
      },
      {
        transaction: true,
      }
    );
  }

  // disableById(accountId: string, id: string) {
  //   return this.createQueryBuilder('room_type')
  //     .update({
  //       disabledBy: accountId,
  //       disabledAt: new Date(),
  //     })
  //     .where('room_type.id = :id', { id: id })
  //     .useTransaction(true)

  //     .execute();
  // }
}
