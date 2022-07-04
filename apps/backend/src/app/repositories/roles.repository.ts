import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Roles } from '../models/role.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Accounts } from '../models';
import { IPaginationMeta, paginateRaw } from 'nestjs-typeorm-paginate';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationParams } from '../controllers/pagination.model';

@CustomRepository(Roles)
export class RolesRepository extends Repository<Roles> {
  async existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('r')
      .select('COUNT(1)', 'count')
      .where('r.id = :id', { id: id })
      .getRawOne()
      .then((data) => data?.count > 0);
  }

  async findByPagination(
    pagination: PaginationParams
  ): Promise<Pagination<Roles>> {
    const query = this.createQueryBuilder('r')
      .select('r.id', 'id')
      .addSelect('r.name', 'name')
      .addSelect('r.description', 'description')
      .where('r.deleted_at IS NULL')
      .andWhere('r.name ILIKE :search', {
        search: `%${pagination.search.trim()}%`,
      })
      .orderBy(pagination.sort, pagination.dir as 'ASC' | 'DESC');
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
      .where('r.id = :id', { id: id })
      .andWhere('r.deleted_at IS NULL')
      .getRawOne<Roles>();
  }

  updateById(id: string, accountId: string, payload: any) {
    return this.save(
      {
        id: id,
        name: payload.name.trim(),
        description: payload.description,
        updatedBy: accountId,
        updatedAt: new Date(),
      },
      {
        transaction: true,
      }
    );
  }

  deleteById(accountId: string, id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('role')
      .update({
        deletedAt: new Date(),
        deletedBy: accountId,
      })
      .where('role.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  getDeletedRoles(search: string): Promise<Roles[]> {
    return this.createQueryBuilder('role')
      .select('role.id', 'id')
      .addSelect('role.name', 'name')
      .addSelect('role.deleted_at', 'deletedAt')
      .addSelect('a.username', 'deletedBy')
      .innerJoin(Accounts, 'a', 'a.id = role.deleted_by')
      .where('role.name LIKE :search', { search: `%${search.trim()}%` })
      .andWhere('role.deleted_at IS NOT NULL')
      .orderBy('role.deleted_at', 'DESC')
      .getRawMany<Roles>();
  }
}
