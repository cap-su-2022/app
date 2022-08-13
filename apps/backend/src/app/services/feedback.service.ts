import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Feedback } from '../models';
import { FeedbackPaginationPayload } from '../payload/request/feedback-pagination.payload';
import { FeedbackReplyRequestPayload } from '../payload/request/feedback-resolve.request.payload';
import { FeedbackSendRequestPayload } from '../payload/request/feedback-send.request.payload';
import { FeedbackRepository } from '../repositories';
import { AccountsService } from './accounts.service';
import { FeedbackHistService } from './feedback-hist.service';
import { NotificationService } from './notification.service';
import * as admin from 'firebase-admin';

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
      if (param.fromDate && param.toDate && param.fromDate > param.toDate) {
        throw new BadRequestException(
          'From date must be less than or equal to To date'
        );
      }

      const payload = {
        data: {
          score: '850',
          time: '2:45',
        },
        notification: {
          title: 'Chó kêu chỉ không chỉ',
          body: 'ĐMM coi chừng mày đó l Nghiêm',
        },
      };
      await admin
        .messaging()
        .sendToDevice(
          'eRvkhdhgTieCMfTyb701dJ:APA91bGo95Vd1ScgvAFeB7V5Srf7I1qZ-NWtgukaIYezNifFjoocRYmJp1zTn6IhBwqu0rtxflf2cDiO6T9xeul87QgNOE5VdalDUJnk4HyLhrU44Qkg0BVc0iYmvv9ooq_LgFXiBfor',
          payload
        )
        .then((response) => {
          // See the MessagingDevicesResponse reference documentation for
          // the contents of response.
          console.log('Successfully sent message:', response);
        })
        .catch((error) => {
          console.log('Error sending message:', error);
        });
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

  async getCountRequestFeedbacks(id: string) {
    try {
      const roleName = await this.accountService.getAccountRoleById(id);
      if (roleName === 'Librarian' || roleName === 'System Admin') {
        return await this.repository.getCountRequestFeedbacks();
      } else if (roleName === 'Staff') {
        return await this.repository.getCountRequestFeedbacksCreatedBy(id);
      }
    } catch (e) {
      this.logger.error(e.message);
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
    } finally {
      await queryRunner.release();
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
    } finally {
      await queryRunner.release();
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
    } finally {
      await queryRunner.release();
    }
  }
}
