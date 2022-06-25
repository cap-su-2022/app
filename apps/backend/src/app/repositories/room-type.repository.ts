import { CustomRepository } from "../decorators/typeorm-ex.decorator";
import { Repository, UpdateResult } from "typeorm";
import { RoomType } from "../models/room-type.entity";
import { PaginationParams } from "../controllers/pagination.model";
import { Accounts } from "../models";
import {RoomTypeUpdateRequestPayload} from "../payload/request/room-type-update.request.payload";

@CustomRepository(RoomType)
export class RoomTypeRepository extends Repository<RoomType> {

  findRoomTypesByPagination(pagination: PaginationParams): Promise<RoomType[]> {
    return this.createQueryBuilder('rt')
      .select('rt.id', 'id')
      .addSelect('rt.name', 'name')
      .addSelect('rt.updated_at')
      .addSelect('rt.is_disabled', 'isDisabled')
      .where('rt.is_deleted = false')
      .andWhere('rt.name LIKE :search', {search: `%${pagination.search}%`})
      .limit(pagination.limit)
      .offset(pagination.page)
      .orderBy(pagination.sort, pagination.dir as "ASC" | "DESC")
      .getRawMany();
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
      .where('rt.id = :id', {id: id})
      .andWhere('rt.is_disabled = false')
      .andWhere('rt.is_deleted = false')
      .getRawOne<RoomType>();
  }

  async deleteByIdAndAccountId(accontId: string, id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('rt')
      .update({
        deletedAt: new Date(),
        deletedBy: accontId,

      })
      .where('rt.id = :id', {id: id})
      .useTransaction(true)
      .execute();
  }

  restoreDisabledById(id: string) {
    return this.createQueryBuilder('rt')
      .update({
        disabledBy: null,
        disabledAt: null,
        updatedAt: new Date(),
        updatedBy: ''
      })
      .where('rt.id = :id', {id: id})
      .useTransaction(true)
      .execute();
  }

  deleteById(id: string) {
    return this.createQueryBuilder('rt')
      .update({
        deletedAt: new Date(),
        deletedBy: ''
      })
      .where('rt.id = :id', {id: id})
      .useTransaction(true)
      .execute();
  }

  findDisabledByPagination(search: string): Promise<RoomType[]> {
    return this.createQueryBuilder('rt')
      .select('rt.id', 'id')
      .addSelect('rt.name', 'name')
      .where('rt.name LIKE :search', {search: search})
      .andWhere('rt.disabled_at IS NOT NULL')
      .getRawMany<RoomType>();
  }

  findDeletedByPagination(search: string): Promise<RoomType[]> {
    return this.createQueryBuilder('rt')
      .select('rt.id', 'id')
      .addSelect('rt.name', 'name')
      .where('rt.name LIKE :search', {search: search})
      .andWhere('rt.deleted_at IS NOT NULL')
      .getRawMany<RoomType>();
  }

  updateById(payload: RoomTypeUpdateRequestPayload) {
    return this.createQueryBuilder('rt')
      .update({
        name: payload.name,
        description: payload.description,
        updatedBy: '',
        updatedAt: new Date(),
      })
      .useTransaction(true)
      .execute();
  }

  disableById(id: string, accountId: string) {
    return this.createQueryBuilder('rt')
      .update({
        disabledAt: new Date(),
        disabledBy: ''
      })
      .where('rt.id = :id', {id: id})
      .useTransaction(true)
      .execute();
  }
}
