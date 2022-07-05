import { randomUUID } from 'crypto';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Repository, UpdateResult } from 'typeorm';
import { PaginationParams } from '../controllers/pagination.model';
import { paginateRaw, Pagination } from 'nestjs-typeorm-paginate';
import { BookingReason } from '../models/booking-reason.entity';
import { Accounts } from '../models';
import { update } from 'react-spring';
import { BadRequestException } from '@nestjs/common';


@CustomRepository(BookingReason)
export class BookingReasonRepository extends Repository<BookingReason> {
  async findByPagination(
    payload: PaginationParams
  ): Promise<Pagination<BookingReason>> {
    const query = this.createQueryBuilder('br')
      .select('br.id', 'id')
      .addSelect('br.name', 'name')
      .where('br.deleted_at IS NULL')
      .andWhere('LOWER(br.name) ILIKE :search', {
        search: `%${payload.search}%`,
      })
      .orderBy(payload.sort, payload.dir as 'ASC' | 'DESC');
    return paginateRaw<BookingReason>(query, {
      limit: payload.limit,
      page: payload.page,
    });
  }

  existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('rt')
      .select('COUNT(1)', 'count')
      .where('rt.id = :id', { id: id })
      .getRawOne()
      .then((data) => data?.count > 0);
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

  findDeletedByPagination(search: string): Promise<BookingReason[]> {
    return this.createQueryBuilder('br')
      .select('br.id', 'id')
      .addSelect('br.name', 'name')
      .addSelect('br.deleted_at', 'deletedAt')
      .addSelect('a.username', 'deletedBy')
      .innerJoin(Accounts, 'a', 'a.id = br.deleted_by')
      .where('br.name ILIKE :search', { search: `%${search.trim()}%` })
      .andWhere('br.deleted_at IS NOT NULL')
      .orderBy('br.deleted_at', 'DESC')
      .getRawMany<BookingReason>();
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
    return this.createQueryBuilder('booking_reason')
      .update({
        deletedBy: accountId,
        deletedAt: new Date(),
      })
      .where('booking_reason.id = :id', { id: id })
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

  async addNew(
    accountId: string,
    payload: { name: string; description: string }
  ): Promise<BookingReason> {
    try {
      return await this.save({
        createdBy: accountId,
        name: payload.name.trim(),
        description: payload.description,
        createdAt: new Date(),
        updatedBy: accountId,
        updatedAt: new Date(),
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
