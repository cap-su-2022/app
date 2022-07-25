import { paginateRaw, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { PaginationParams } from '../controllers/pagination.model';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Accounts } from '../models';
import { FeedbackType } from '../models/feedback-type.entity';
import { MasterDataAddRequestPayload } from '../payload/request/master-data-add.request.payload';

@CustomRepository(FeedbackType)
export class FeedbackTypeRepository extends Repository<FeedbackType> {
    existsById(id: string): Promise<boolean> {
        return this.createQueryBuilder('ft')
          .select('COUNT(1)', 'count')
          .where('ft.id = :id', { id: id })
          .getRawOne()
          .then((data) => data?.count > 0);
      }
    
      findByPagination(
        pagination: PaginationParams
      ): Promise<Pagination<FeedbackType>> {
        const query = this.createQueryBuilder('ft')
          .select('ft.id', 'id')
          .addSelect('ft.name', 'name')
          .where('ft.deleted_at IS NULL')
          .andWhere('ft.name ILIKE :search', {
            search: `%${pagination.search.trim()}%`,
          })
          .orderBy(pagination.sort, pagination.dir as 'ASC' | 'DESC');
    
        return paginateRaw<FeedbackType>(query, {
          page: pagination.page,
          limit: pagination.limit,
        });
      }
    
      findFeedbackTypeName(): Promise<FeedbackType[]> {
        return this.createQueryBuilder('ft')
          .select('ft.id', 'id')
          .addSelect('ft.name', 'name')
          .andWhere('ft.deleted_at IS NULL')
          .getRawMany<FeedbackType>();
      }
    
      async findById(id: string): Promise<FeedbackType> {
        return this.createQueryBuilder('ft')
          .select('ft.id', 'id')
          .addSelect('ft.name', 'name')
          .addSelect('ft.description', 'description')
          .addSelect('a.username', 'createdBy')
          .addSelect('ft.created_at', 'createdAt')
          .addSelect('aa.username', 'updatedBy')
          .addSelect('ft.updated_at', 'updatedAt')
          .innerJoin(Accounts, 'a', 'a.id = ft.created_by')
          .leftJoin(Accounts, 'aa', 'aa.id = ft.updated_by')
          .where('ft.id = :id', { id: id })
          .andWhere('ft.deleted_at IS NULL')
          .getRawOne<FeedbackType>();
      }
    
      async addNew(
        accountId: string,
        payload: { name: string; description: string }
      ): Promise<FeedbackType> {
        return this.save<FeedbackType>(
          {
            name: payload.name.trim(),
            description: payload.description,
            createdBy: accountId,
            createdAt: new Date(),
          },
          {
            transaction: true,
          }
        );
      }
    
      async updateById(
        accountId: string,
        feedbackTypeId: string,
        payload: MasterDataAddRequestPayload
      ) {
        const oldData = await this.findOneOrFail({
          where: {
            id: feedbackTypeId,
          }
        })
        return this.save(
          {
            ...oldData,
            id: feedbackTypeId,
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
    
      async deleteById(accountId: string, id: string) {
        const isDeleted = await this.createQueryBuilder('ft')
          .update({
            deletedAt: new Date(),
            deletedBy: accountId,
          })
          .where('ft.id = :id', { id: id })
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
    
      findDeletedByPagination(search: string): Promise<FeedbackType[]> {
        return this.createQueryBuilder('ft')
          .select('ft.id', 'id')
          .addSelect('ft.name', 'name')
          .addSelect('ft.deleted_at', 'deletedAt')
          .addSelect('a.username', 'deletedBy')
          .innerJoin(Accounts, 'a', 'a.id = ft.deleted_by')
          .where('ft.name ILIKE :search', { search: `%${search.trim()}%` })
          .andWhere('ft.deleted_at IS NOT NULL')
          .orderBy('ft.deleted_at', 'DESC')
          .getRawMany<FeedbackType>();
      }
    
      async restoreDeletedById(accountId: string, id: string) {
        const isRestored = await this.createQueryBuilder('ft')
          .update({
            updatedAt: new Date(),
            updatedBy: accountId,
            deletedAt: null,
            deletedBy: null,
          })
          .where('ft.id = :id', { id: id })
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
    
      async permanentlyDeleteById(id: string) {
        return this.createQueryBuilder('ft')
          .delete()
          .where('ft.id = :id', { id: id })
          .useTransaction(true)
          .execute();
      }
    
}
