import { paginateRaw, Pagination } from 'nestjs-typeorm-paginate';
import { QueryRunner, Repository } from 'typeorm';
import { PaginationParams } from '../controllers/pagination.model';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Accounts } from '../models';
import { BookingRoomFeedback } from '../models/booking-room-feedback.entity';
import { BookingFeedbackSendRequestPayload } from '../payload/request/booking-feedback-send.request.payload';

@CustomRepository(BookingRoomFeedback)
export class BookingFeedbackRepository extends Repository<BookingRoomFeedback> {
  existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('f')
      .select('COUNT(1)', 'count')
      .where('f.id = :id', { id: id })
      .getRawOne()
      .then((data) => data?.count > 0);
  }

  findByPagination(
    pagination: PaginationParams
  ): Promise<Pagination<BookingRoomFeedback>> {
    const query = this.createQueryBuilder('f')
      .select('f.id', 'id')
      .addSelect('f.created_by', 'createdBy')
      .addSelect('f.created_at', 'createdAt')
      .addSelect('f.rate_num', 'rateNum')
      .addSelect('a.username', 'createdByName')
      .innerJoin(Accounts, 'a', 'a.id = f.created_by')
      //   .andWhere('f.name ILIKE :search', {
      //     search: `%${pagination.search.trim()}%`,
      //   })
      .orderBy('f.created_at', 'DESC');

    return paginateRaw<BookingRoomFeedback>(query, {
      page: pagination.page,
      limit: pagination.limit,
    });
  }

  async findById(id: string): Promise<BookingRoomFeedback> {
    return this.createQueryBuilder('fb')
      .select('fb.id', 'id')
      .addSelect('fb.feedback_msg', 'feedbackMess')
      .addSelect('fb.feedback_type', 'feedbackType')
      .addSelect('fb.rate_num', 'rateNum')
      .addSelect('fb.booking_room_id', 'bookingRoomId')
      .addSelect('aa.username', 'createdBy')
      .addSelect('fb.created_at', 'createdAt')
      .leftJoin(Accounts, 'aa', 'aa.id = fb.created_by')
      .where('fb.id = :id', { id: id })
      .getRawOne<BookingRoomFeedback>();
  }

  async addNew(
    accountId: string,
    payload: BookingFeedbackSendRequestPayload,
    queryRunner: QueryRunner
  ) {
    return queryRunner.manager.save(
      BookingRoomFeedback,
      {
        feedbackMessage: payload.message,
        feedbackType: payload.type,
        rateNum: payload.rateNum,
        bookingRoomId: payload.bookingRoomId,
        createdBy: accountId,
        createdAt: new Date(),
      }
    );
  }
}
