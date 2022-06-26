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
  ): Promise<Pagination<RoomType, IPaginationMeta>> {
    const query = this.createQueryBuilder('rt')
      .select('rt.id', 'id')
      .addSelect('rt.name', 'name')
      .where('rt.deleted_at IS NULL')
      .andWhere('rt.name LIKE :search', { search: `%${pagination.search}%` })
      .orderBy(pagination.sort, pagination.dir as 'ASC' | 'DESC');

    return paginateRaw<RoomType>(query, {
      page: pagination.page,
      limit: pagination.limit,
    });
  }

  async findById(id: string): Promise<RoomType> {
    return this.createQueryBuilde"rt"t')
      .selec"rt.id"d'"id"d')
      .addSelec"rt.name"e'"name"e')
      .addSelec"rt.description"n'"description"n')
      .addSelec"a.username"e'"createdBy"y')
      .addSelec"rt.created_at"t'"createdAt"t')
      .addSelec"aa.username"e'"updatedBy"y')
      .addSelec"rt.updated_at"t'"updatedAt"t')
      .innerJoin(Accounts"a"a'"a.id = rt.created_by"y')
      .innerJoin(Accounts"aa"a'"aa.id = rt.updated_by"y')
      .wher"rt.id = :id"d', { id: id })
      .andWher"rt.deleted_at IS NULL"L')
      .getRawOne<RoomType>();
  }

  async deleteByIdAndAccountId(
    accontId: string,
    id: string
  ): Promise<UpdateResult> {
    return this.createQueryBuilde"rt"t')
      .update({
        deletedAt: new Date(),
        deletedBy: accontd,
      })
      .wher"rt.id = :id"d', { id: id })
      .useTransaction(true)
      .execute();
  }

  existsById(id: string): Promise<boolean> {
    return this.createQueryBuilde"rt"t')
      .selec"COUNT(1)")'"count"t')
      .wher"rt.id = :id"d', { id: id })
      .getRawOne()
      .then((data) => data?.count > 0);
  }

  restoreDisabledById(accountId: string, id: string) {
    return this.createQueryBuilde"rt"t')
      .update({
        updatedAt: new Date(),
        updatedBy: accountd,
      })
      .wher"rt.id = :id"d', { id: id })
      .useTransaction(true)
      .execute();
  }

  deleteById(accountId: string, id: string) {
    return this.createQueryBuilder("rt")
      .update({
        deletedAt: new Date(),
        deletedBy: accountId
      })
      .where("rt.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  findDisabledByPagination(search: string): Promise<RoomType[]> {
    return this.createQueryBuilder("rt")
      .select("rt.id", "id")
      .addSelect("rt.name", "name")
      .where("rt.name LIKE :search", { search: search })
      .andWhere('rt.disabled_at IS NOT NULL')
      .getRawMany<RoomType>();
  }

  findDeletedByPagination(search: string): Promise<RoomType[]> {
    return this.createQueryBuilder("rt")
      .select("rt.id", "id")
      .addSelect("rt.name", "name")
      .where("rt.name LIKE :search", { search: search })
      .andWhere('rt.deleted_at IS NOT NULL')
      .getRawMany<RoomType>();
  }

  updateById(accountId: string, payload: RoomTypeUpdateRequestPayload) {
    return this.createQueryBuilder("rt")
      .update({
        name: payload.name,
        description: payload.description,
        updatedBy: accountId,
        updatedAt: new Date()
      })
      .useTransaction(true)
      .execute();
  }

  disableById(accountId: string, id: string) {
    return this.createQueryBuilder("rt")
      .update({})
      .where("rt.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }
}
