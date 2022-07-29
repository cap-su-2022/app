import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { NotificationRepository } from '../repositories/notification.repository';
import { Notification } from '../models/notification.entity';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly repository: NotificationRepository) {}

  sendAcceptRequestNotification(
    checkinDate: string,
    checkinSlotName: string,
    checkoutSlotName: string,
    roomName: string,
    receiver: string,
    queryRunner: QueryRunner
  ) {
    try {
      const notification = {
        title: 'Your request booking was accepted',
        message: `Your reservation request on ${checkinDate}, ${checkinSlotName} to ${checkoutSlotName} for room ${roomName} has been accepted.${' '}Please present the QR code at the reception to perform the check-in step`,
      };

      return this.repository.sendNotification(
        notification,
        receiver,
        queryRunner
      );
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'Error occurred while send notification'
      );
    }
  }

  sendBookedForNotification(
    checkinDate: string,
    checkinSlotName: string,
    checkoutSlotName: string,
    roomName: string,
    sender: string,
    receiver: string,
    queryRunner: QueryRunner
  ) {
    try {
      const notification = {
        title: 'You have been booked by admin',
        message: `You have been helped by ${sender} to book room ${roomName} on ${checkinDate}, from ${checkinSlotName} to ${checkoutSlotName}.`,
      };

      return this.repository.sendNotification(
        notification,
        receiver,
        queryRunner
      );
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'Error occurred while send notification'
      );
    }
  }

  async sendRejectRequestNotification(
    checkinDate: string,
    checkinSlotName: string,
    checkoutSlotName: string,
    roomName: string,
    reason: string,
    receiver: string,
    queryRunner: QueryRunner
  ) {
    try {
      const notification = {
        title: 'Your request booking was rejected',
        message: `Your reservation request on ${checkinDate}, ${checkinSlotName} to ${checkoutSlotName} for room ${roomName} has been rejected. Reason is ${reason}`,
      };
      return await this.repository.sendNotification(
        notification,
        receiver,
        queryRunner
      );
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'Error occurred while send notification'
      );
    }
  }

  async sendCancelRequestNotification(
    checkinDate: string,
    checkinSlotName: string,
    checkoutSlotName: string,
    roomName: string,
    reason: string,
    receiver: string,
    queryRunner: QueryRunner
  ) {
    try {
      const notification = {
        title: 'Your request booking was cancelled',
        message: `Your reservation request on ${checkinDate}, ${checkinSlotName} to ${checkoutSlotName} for room ${roomName} has been cancelled. Reason is ${reason}`,
      };
      return await this.repository.sendNotification(
        notification,
        receiver,
        queryRunner
      );
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'Error occurred while send notification'
      );
    }
  }

  sendReplyFeedbackNotification(
    payload: {
      status: string;
      replier: string;
      receiver: string;
      replyMess: string;
    },
    queryRunner: QueryRunner
  ) {
    try {
      let notification = { title: '', message: '' };
      if (payload.status === 'RESOLVE') {
        notification = {
          title: 'Your feedback has been resolved',
          message: `Your feedback has been addressed by ${payload.replier}. The solution given is: ${payload.replyMess}`,
        };
      } else {
        notification = {
          title: 'Your feedback has been rejected',
          message: `Your feedback has been rejected by ${payload.replier}. The reason given is: ${payload.replyMess}`,
        };
      }
      return this.repository.sendNotification(
        notification,
        payload.receiver,
        queryRunner
      );
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'Error occurred while send notification'
      );
    }
  }

  getYourOwnNotifications(userId: string) {
    try {
      return this.repository.getYourOwnNotifications(userId);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'Error occurred while get notifications'
      );
    }
  }

  async getDetailNotificationId(id: string): Promise<Notification> {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Notification does not found with the provided id'
        );
      }
      return this.repository.findById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
