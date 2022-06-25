import {CustomRepository} from "../decorators/typeorm-ex.decorator";
import {Roles} from "../models/role.entity";
import {Repository, UpdateResult} from "typeorm";
import {Accounts} from "../models";
import {IPaginationMeta, paginateRaw} from "nestjs-typeorm-paginate";
import { Pagination } from 'nestjs-typeorm-paginate';
import {PaginationParams} from "../controllers/pagination.model";

@CustomRepository(Roles)
export class RolesRepository extends Repository<Roles>{

  async findByPagination(pagination: PaginationParams): Promise<Pagination<Roles>> {
    const query = this.createQueryBuilder('r')
      .select('r.id', 'id')
      .addSelect('r.name', 'name')
      .addSelect('r.description', 'description')
     .where('r.deleted_at IS NULL')
     .andWhere('r.name LIKE :search', {search: `%${pagination.search}%`})
      .orderBy(pagination.sort, pagination.dir as "ASC" | "DESC");
     return paginateRaw<Roles, IPaginationMeta>(query, {
      limit: pagination.limit,
      page: pagination.page,
    });
  }

     findById(id: string): Promise<Roles> {
        return this.createQueryBuilder('r')
          .select('r.id', 'id')
          .addSelect('r.name', 'name')
          .addSelect('r.description', 'description')
          .addSelect('r.created_at', 'createdAt')
          .addSelect('r.updated_at', 'updatedAt')
          .addSelect('a.username', 'createdBy')
          .addSelect('aa.username', 'updatedAt')
          .innerJoin(Accounts, 'a', 'a.id = r.created_by')
          .innerJoin(Accounts, 'aa', 'aa.id = r.updated_by')
         .where('r.id = :id', {id: id})
         .andWhere('r.deleted_at IS NULL')
          .getRawOne<Roles>();
    }

    updateById(accountId: string, payload: any): Promise<UpdateResult> {
       return this.createQueryBuilder('r')
         .update({
           name: payload.name,
           description: payload.description,
           updatedAt: new Date(),
           updatedBy: accountId
         })
         .useTransaction(true)
         .execute();
    }

    deleteById(accountId: string, id: string): Promise<UpdateResult> {
       return this.createQueryBuilder('r')
         .update({
           deletedAt: new Date(),
           deletedBy: accountId
         })
         .useTransaction(true)
         .execute();
    }



}
