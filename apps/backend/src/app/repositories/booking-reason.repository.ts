import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Repository, UpdateResult } from 'typeorm';
import { PaginationParams } from '../controllers/pagination.model';
import { paginateRaw, Pagination } from 'nestjs-typeorm-paginate';
import { BookingReason } from '../models/booking-reason.entity';
import { Accounts } from '../models';
import { update } from 'react-spring';

@CustomRepository(BookingReason)
export class BookingReasonRepository extends Repository<BookingReason> {
  async findByPagination(
    payload: PaginationParams
  ): Promise<Pagination<BookingReason>> {
    const query = this.createQueryBuilder('br')
      .select('br.id', 'id')
      .addSelect('br.name', 'name')
      .where('br.deleted_at IS NULL')
      .andWhere('LOWER(br.name) LIKE :search', {
        search: `%${payload.search}%`,
      });
    return paginateRaw<BookingReason>(query, {
      limit: payload.limit,
      page: payload.page,
    });
  }

  async findById(id: string): Promise<BookingReason> {
    return this.createQueryBuilder('br')
      .select('br.id', 'id')
      .addSelect('br.name', 'name')
      .addSelect('br.description', 'description')
      .addSelect('br.created_at', 'createdAt')
      .addSelect('a.username', 'createdBy')
      .addSelect('br.updated_at', 'updatedAt')
      .addSelect('aa.username', 'updatedBy')
      .addSelect('br.deleted_at', 'deletedAt')
      .addSelect('aaa.username', 'deletedBy')
      .leftJoin(Accounts, 'a', 'a.id = br.created_by')
      .leftJoin(Accounts, 'aa', 'aa.id = br.updated_by')
      .leftJoin(Accounts, 'aaa', 'aaa.id = br.deleted_by')
      .where('br.id = :id', { id: id })
      .getRawOne<BookingReason>();
  }

  async restoreDeletedById(
    accountId: string,
    id: string
  ): Promise<UpdateResult> {
    return this.createQueryBuilder('br')
      .update({
        deletedBy: null,
        deletedAt: null,
      })
      .where('br.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  async deleteById(accountId: string, id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('br')
      .update({
        deletedBy: accountId,
        deletedAt: accountId,
      })
      .where('br.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  async createNew(
    accountId: string,
    payload: BookingReason
  ): Promise<BookingReason> {
    return this.save(
      {
        createdAt: new Date(),
        createdBy: accountId,
        name: payload.name,
        description: payload.description,
      },
      {
        transaction: true,
      }
    );
  }

  async updateById(
    accountId: string,
    payload: BookingReason
  ): Promise<BookingReason> {
    return this.save(
      {
        updatedAt: new Date(),
        updatedBy: accountId,
        name: payload.name,
        id: payload.id,
        description: payload.description,
      },
      {
        transaction: true,
      }
    );
  }
}
