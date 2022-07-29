import { paginateRaw, Pagination } from 'nestjs-typeorm-paginate';
import { QueryRunner, Repository } from 'typeorm';
import { PaginationParams } from '../controllers/pagination.model';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Accounts } from '../models';
import { Feedback } from '../models/feedback.entity';
import { FeedbackPaginationPayload } from '../payload/request/feedback-pagination.payload';
import { FeedbackReplyRequestPayload } from '../payload/request/feedback-resolve.request.payload';
import { FeedbackSendRequestPayload } from '../payload/request/feedback-send.request.payload';

@CustomRepository(Feedback)
export class FeedbackRepository extends Repository<Feedback> {
  existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('f')
      .select('COUNT(1)', 'count')
      .where('f.id = :id', { id: id })
      .getRawOne()
      .then((data) => data?.count > 0);
  }

  findByPagination(
    pagination: FeedbackPaginationPayload
  ): Promise<Pagination<Feedback>> {
    const query = this.createQueryBuilder('f')
      .select('f.id', 'id')
      .addSelect('f.created_by', 'createdBy')
      .addSelect('f.created_at', 'createdAt')
      .addSelect('f.status', 'status')
      .addSelect('a.username', 'createdByName')
      .innerJoin(Accounts, 'a', 'a.id = f.created_by')
      .where('f.deleted_at IS NULL')
      .andWhere('f.status LIKE :status', {
        status: `%${pagination.status}%`,
      })
      //   .andWhere('f.name ILIKE :search', {
      //     search: `%${pagination.search.trim()}%`,
      //   })
      .orderBy('f.created_at', 'DESC');

    return paginateRaw<Feedback>(query, {
      page: pagination.page,
      limit: pagination.limit,
    });
  }

  async findById(id: string): Promise<Feedback> {
    return this.createQueryBuilder('fb')
      .select('fb.id', 'id')
      .addSelect('fb.feedback_msg', 'feedbackMess')
      .addSelect('fb.status', 'status')
      .addSelect('fb.reply_msg', 'replyMess')
      .addSelect('a.username', 'resolvedBy')
      .addSelect('fb.resolved_at', 'resolvedAt')
      .addSelect('aa.username', 'createdBy')
      .addSelect('fb.created_at', 'createdAt')
      .addSelect('aaa.username', 'rejectedBy')
      .addSelect('fb.rejected_at', 'rejectedAt')
      .leftJoin(Accounts, 'a', 'a.id = fb.resolved_by')
      .leftJoin(Accounts, 'aa', 'aa.id = fb.created_by')
      .leftJoin(Accounts, 'aaa', 'aaa.id = fb.rejected_by')
      .where('fb.id = :id', { id: id })
      .andWhere('fb.deleted_at IS NULL')
      .getRawOne<Feedback>();
  }

  async addNew(
    accountId: string,
    payload: FeedbackSendRequestPayload,
    queryRunner: QueryRunner
  ): Promise<Feedback> {
    return queryRunner.manager.save(
      Feedback,
      {
        feedbackMessage: payload.message,
        feedbackTypeId: payload.type,
        createdBy: accountId,
        createdAt: new Date(),
        status: 'PENDING',
      },
      {
        transaction: true,
      }
    );
  }

  async resolveById(
    accountId: string,
    feedbackId: string,
    payload: FeedbackReplyRequestPayload,
    queryRunner: QueryRunner
  ) {
    const oldData = await this.findOneOrFail({
      where: {
        id: feedbackId,
      },
    });
    return queryRunner.manager.save(
      Feedback,
      {
        ...oldData,
        id: feedbackId,
        replyMessage: payload.replyMessage,
        status: 'RESOLVED',
        resolvedBy: accountId,
        resolvedAt: new Date(),
      },
      {
        transaction: true,
      }
    );
  }

  async rejectById(
    accountId: string,
    feedbackId: string,
    payload: FeedbackReplyRequestPayload,
    queryRunner: QueryRunner
  ) {
    const oldData = await this.findOneOrFail({
      where: {
        id: feedbackId,
      },
    });
    return queryRunner.manager.save(
      Feedback,
      {
        ...oldData,
        id: feedbackId,
        replyMessage: payload.replyMessage,
        status: 'REJECTED',
        rejectedBy: accountId,
        rejectedAt: new Date(),
      },
      {
        transaction: true,
      }
    );
  }
}
