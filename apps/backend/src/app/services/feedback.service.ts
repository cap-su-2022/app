import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PaginationParams } from '../controllers/pagination.model';
import { Feedback } from '../models';
import { FeedbackPaginationPayload } from '../payload/request/feedback-pagination.payload';
import { FeedbackReplyRequestPayload } from '../payload/request/feedback-resolve.request.payload';
import { FeedbackSendRequestPayload } from '../payload/request/feedback-send.request.payload';
import { FeedbackRepository } from '../repositories';
import { AccountsService } from './accounts.service';
import { FeedbackHistService } from './feedback-hist.service';
import { NotificationService } from './notification.service';

@Injectable()
export class FeedbackService {
  private readonly logger = new Logger(FeedbackService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly repository: FeedbackRepository,
    private readonly histService: FeedbackHistService,
    private readonly notificationService: NotificationService,
    private readonly accountService: AccountsService
  ) {}

  async getAllFeedbacks(accountId: string, param: FeedbackPaginationPayload) {
    try {
      if (param.fromDate > param.toDate) {
        throw new BadRequestException(
          'From date must be less than or equal to To date'
        );
      }
      const roleName = await this.accountService.getAccountRoleById(accountId);
      if (roleName === 'Staff') {
        return await this.repository.findByPagination(accountId, param);
      } else {
        return await this.repository.findByPagination(undefined, param);
      }
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async addNewFeedback(accountId: string, payload: FeedbackSendRequestPayload) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const feedback = await this.repository.addNew(
        accountId,
        payload,
        queryRunner
      );
      await this.histService.createNew(feedback, queryRunner);

      await queryRunner.commitTransaction();
      return feedback;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    }
  }

  async getFeedbackById(id: string): Promise<Feedback> {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Feedback does not found with the provided id'
        );
      }
      const data = await this.repository.findById(id);
      return data;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async resolveFeedbackById(
    accountId: string,
    id: string,
    payload: FeedbackReplyRequestPayload
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Feedback does not found with the provided id'
        );
      }
      const data = await this.repository.findOneOrFail({
        where: {
          id: id,
        },
      });
      if (data.status === 'RESOLVED') {
        throw new BadRequestException('Feedback was resolved!');
      } else if (data.status === 'REJECTED') {
        throw new BadRequestException('Feedback was rejected!');
      }
      const feedback = await this.repository.resolveById(
        accountId,
        id,
        payload,
        queryRunner
      );
      await this.histService.createNew(feedback, queryRunner);

      const user = await this.accountService.getRoleOfAccount(accountId);
      await this.notificationService.sendReplyFeedbackNotification(
        {
          status: 'REJECT',
          replier: user.username,
          receiver: feedback.createdBy,
          replyMess: payload.replyMessage,
        },
        queryRunner
      );

      await queryRunner.commitTransaction();
      return feedback;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    }
  }

  async rejectFeedbackById(
    accountId: string,
    id: string,
    payload: FeedbackReplyRequestPayload
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Feedback does not found with the provided id'
        );
      }
      const data = await this.repository.findOneOrFail({
        where: {
          id: id,
        },
      });
      if (data.status === 'RESOLVED') {
        throw new BadRequestException('Feedback was resolved!');
      } else if (data.status === 'REJECTED') {
        throw new BadRequestException('Feedback was rejected!');
      }
      const feedback = await this.repository.rejectById(
        accountId,
        id,
        payload,
        queryRunner
      );
      await this.histService.createNew(feedback, queryRunner);

      const user = await this.accountService.getRoleOfAccount(accountId);
      await this.notificationService.sendReplyFeedbackNotification(
        {
          status: 'RESOLVE',
          replier: user.username,
          receiver: feedback.createdBy,
          replyMess: payload.replyMessage,
        },
        queryRunner
      );

      await queryRunner.commitTransaction();
      return feedback;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    }
  }
}
