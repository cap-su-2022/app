import { CustomRepository } from "../decorators/typeorm-ex.decorator";
import { Repository, UpdateResult } from "typeorm";
import { RoomType } from "../models/room-type.entity";
import { Pagination } from "../controllers/pagination.model";
import { Accounts } from "../models";

@CustomRepository(RoomType)
export class RoomTypeRepository extends Repository<RoomType> {

  findRoomTypesByPagination(pagination: Pagination): Promise<RoomType[]> {
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
        isDeleted: true,
        deletedBy: accontId,

      })
      .where('rt.id = :id', {id: id})
      .useTransaction(true)
      .execute();
  }
}
