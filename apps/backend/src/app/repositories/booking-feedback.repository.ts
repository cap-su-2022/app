import {paginateRaw, Pagination} from 'nestjs-typeorm-paginate';
import {QueryRunner, Repository} from 'typeorm';
import {PaginationParams} from '../controllers/pagination.model';
import {CustomRepository} from '../decorators/typeorm-ex.decorator';
import {Accounts, BookingRequest, FeedbackType, Rooms} from '../models';
import {BookingRoomFeedback} from '../models/booking-room-feedback.entity';
import {BookingFeedbackSendRequestPayload} from '../payload/request/booking-feedback-send.request.payload';
import dayjs = require('dayjs');

@CustomRepository(BookingRoomFeedback)
export class BookingFeedbackRepository extends Repository<BookingRoomFeedback> {
  existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('f')
      .select('COUNT(1)', 'count')
      .where('f.id = :id', {id: id})
      .getRawOne()
      .then((data) => data?.count > 0);
  }

  isAlreadyFeedback(id: string): Promise<boolean> {
    return this.createQueryBuilder('f')
      .select('COUNT(1)', 'count')
      .where('f.booking_room_id = :id', {id: id})
      .getRawOne()
      .then((data) => data?.count > 0);
  }

  findByPagination(accountId: string, pagination: any): Promise<any> {
    const query = this.createQueryBuilder('f')
      .select('f.id', 'id')
      .addSelect('f.created_by', 'createdBy')
      .addSelect('f.created_at', 'createdAt')
      .addSelect('f.rate_num', 'rateNum')
      .addSelect('a.username', 'createdByName')
      .addSelect('a.email', 'createdByEmail')
      .addSelect('ft.name', 'feedbackType')
      .addSelect('r.name', 'roomName')
      .innerJoin(BookingRequest, 'br', 'br.id = f.booking_room_id')
      .innerJoin(Rooms, 'r', 'r.id = br.room_id')
      .innerJoin(Accounts, 'a', 'a.id = f.created_by')
      .innerJoin(FeedbackType, 'ft', 'f.feedback_type = ft.id')
        .andWhere('ft.name ILIKE :search OR r.name ILIKE :search', {
          search: `%${pagination.search.trim()}%`,
        })
      .orderBy(pagination.sort, pagination.dir as 'ASC' | 'DESC');

    if (pagination.room) {
      query.andWhere('r.id = :roomId', {roomId: pagination.room});
    }

    if (accountId) {
      query.andWhere(`f.${pagination.sort} = :accountId`, { accountId: accountId });
    }

    if (pagination.star) {
      query.andWhere('f.rate_num IN (:...rateNum)', {
        rateNum: JSON.parse(pagination.star),
      });
    }

    if (pagination.type) {
      query.andWhere('f.feedback_type = :feedbackTypeId', {
        feedbackTypeId: pagination.type,
      });
    }

    if (pagination.fromDate && pagination.toDate) {
      query
        .andWhere('f.created_at >= :fromDate', {
          fromDate: dayjs(pagination.fromDate).startOf('day').toDate(),
        })
        .andWhere('f.created_at <= :toDate', {
          toDate: dayjs(pagination.toDate).endOf('day').toDate(),
        });
    }

    if (!pagination || !pagination.page) {
      return query.getRawMany();
    }

    return paginateRaw<BookingRoomFeedback>(query, {
      page: pagination.page,
      limit: pagination.limit,
    });
  }

  async findById(id: string): Promise<BookingRoomFeedback> {
    return this.createQueryBuilder('fb')
      .select('fb.id', 'id')
      .addSelect('fb.feedback_msg', 'feedbackMess')
      .addSelect('ft.name', 'feedbackType')
      .addSelect('fb.rate_num', 'rateNum')
      .addSelect('fb.booking_room_id', 'bookingRoomId')
      .addSelect('aa.username', 'createdBy')
      .addSelect('fb.created_at', 'createdAt')
      .addSelect('aa.email', 'createdByEmail')
      .innerJoin(FeedbackType, 'ft', 'fb.feedback_type = ft.id')
      .innerJoin(Accounts, 'aa', 'aa.id = fb.created_by')
      .where('fb.id = :id', {id: id})
      .getRawOne<BookingRoomFeedback>();
  }

  async addNew(
    accountId: string,
    payload: BookingFeedbackSendRequestPayload,
    queryRunner: QueryRunner
  ) {
    return queryRunner.manager.save(BookingRoomFeedback, {
      feedbackMessage: payload.message,
      feedbackType: payload.type,
      rateNum: payload.rateNum,
      bookingRoomId: payload.bookingRoomId,
      createdBy: accountId,
      createdAt: new Date(),
    });
  }
}
