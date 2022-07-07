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
      .andWhere('br.deleted_at IS NULL')
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

  async get(id: string): Promise<BookingReason> {
    return this.createQueryBuilder('booking-reason')
      .select('booking-reason.id', 'id')
      .addSelect('booking-reason.name', 'name')
      .addSelect('booking-reason.description', 'description')
      .addSelect('booking-reason.created_by', 'createdBy')
      .addSelect('booking-reason.created_at', 'createdAt')
      .addSelect('booking-reason.updated_by', 'updatedBy')
      .addSelect('booking-reason.updated_at', 'updatedAt')
      .addSelect('booking-reason.deleted_by', 'deletedBy')
      .addSelect('booking-reason.deleted_at', 'deletedAt')

      .where('booking-reason.id = :id', { id: id })
      .getRawOne<BookingReason>();
  }

  async restoreDeletedById(accountId: string, id: string) {
    const isRestored = await this.createQueryBuilder('booking_reason')
      .update({
        deletedBy: null,
        deletedAt: null,
        updatedBy: accountId,
        updatedAt: new Date(),
      })
      .where('booking_reason.id = :id', { id: id })
      .useTransaction(true)
      .execute();
    if (isRestored.affected > 0) {
      return this.get(id);
    }
  }

  async deleteById(accountId: string, id: string){
    const isDeleted = await this.createQueryBuilder('booking_reason')
      .update({
        deletedBy: accountId,
        deletedAt: new Date(),
      })
      .where('booking_reason.id = :id', { id: id })
      .useTransaction(true)
      .execute();
      if (isDeleted.affected > 0) {
        return this.get(id);
      }
  }

  async createNew(
    accountId: string,
    payload: BookingReason
  ): Promise<BookingReason> {
    try {
      return await this.save({
        createdBy: accountId,
        name: payload.name.trim(),
        description: payload.description,
        createdAt: new Date(),
        updatedBy: accountId,
        updatedAt: new Date(),
      },
      {
        transaction: true,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateById(
    accountId: string,
    payload: BookingReason,
    id: string
  ): Promise<BookingReason> {
    return await this.save(
      {
        id: id,
        updatedAt: new Date(),
        updatedBy: accountId,
        name: payload.name,
        description: payload.description,
      },
      {
        transaction: true,
      }
    );
  }
  async permanentlyDeleteById(id: string) {
    return this.createQueryBuilder('booking_reason')
      .delete()
      .where('booking_reason.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }
}
