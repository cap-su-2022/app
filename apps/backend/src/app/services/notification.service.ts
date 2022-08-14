import { BadRequestException, forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { NotificationRepository } from '../repositories/notification.repository';
import { Notification } from '../models/notification.entity';
import * as admin from 'firebase-admin';
import { AccountsService } from './accounts.service';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly repository: NotificationRepository,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountService: AccountsService
  ) {}

  async sendAcceptRequestNotification(
    checkinDate: string,
    checkinSlotName: string,
    checkoutSlotName: string,
    roomName: string,
    receiver: string,
    queryRunner: QueryRunner
  ) {
    try {
      const slotText =
        checkinSlotName === checkoutSlotName
          ? `at ${checkinSlotName}`
          : `from ${checkinSlotName} to ${checkoutSlotName}`;
      const notification = {
        title: 'Your booking request was accepted',
        message: `Your reservation request on ${checkinDate}, ${slotText} for room ${roomName} has been accepted. Please present the QR code at the reception to perform the check-in step`,
      };

      const _receiver = await this.accountService.getRoleOfAccount(
        receiver
      );
      if (_receiver.fcmToken) {
        const message = {
          data: {
            score: '850',
            time: '2:45',
          },
          notification: {
            title: 'FLBRMS',
            body: 'Your booking request was accepted',
          },
        };
        await admin
          .messaging()
          .sendToDevice(_receiver.fcmToken, message)
          .then((response) => {
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });
      }

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

  async sendBookedForNotification(
    checkinDate: string,
    checkinSlotName: string,
    checkoutSlotName: string,
    roomName: string,
    sender: string,
    receiver: string,
    queryRunner: QueryRunner
  ) {
    try {
      const slotText =
        checkinSlotName === checkoutSlotName
          ? `at ${checkinSlotName}`
          : `from ${checkinSlotName} to ${checkoutSlotName}`;

      const notification = {
        title: 'You have been booked by librarian',
        message: `You have been helped by ${sender} to book room ${roomName} on ${checkinDate}, ${slotText}.`,
      };

      const _receiver = await this.accountService.getRoleOfAccount(
        receiver
      );
      if (_receiver.fcmToken) {
        const message = {
          data: {
            score: '850',
            time: '2:45',
          },
          notification: {
            title: 'FLBRMS',
            body: 'You have been booked by librarian',
          },
        };
        await admin
          .messaging()
          .sendToDevice(_receiver.fcmToken, message)
          .then((response) => {
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });
      }

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
      const slotText =
        checkinSlotName === checkoutSlotName
          ? `at ${checkinSlotName}`
          : `from ${checkinSlotName} to ${checkoutSlotName}`;

      const notification = {
        title: 'Your request booking was rejected',
        message: `Your reservation request on ${checkinDate}, ${slotText} for room ${roomName} has been rejected. Reason is ${reason}`,
      };

      const _receiver = await this.accountService.getRoleOfAccount(
        receiver
      );
      if (_receiver.fcmToken) {
        const message = {
          data: {
            score: '850',
            time: '2:45',
          },
          notification: {
            title: 'FLBRMS',
            body: 'Your request booking was rejected',
          },
        };
        await admin
          .messaging()
          .sendToDevice(_receiver.fcmToken, message)
          .then((response) => {
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });
      }

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
      const slotText =
        checkinSlotName === checkoutSlotName
          ? `at ${checkinSlotName}`
          : `from ${checkinSlotName} to ${checkoutSlotName}`;

      const notification = {
        title: 'Your request booking was cancelled',
        message: `Your reservation request on ${checkinDate}, ${slotText} for room ${roomName} has been cancelled. Reason is ${reason}`,
      };

      const _receiver = await this.accountService.getRoleOfAccount(
        receiver
      );
      if (_receiver.fcmToken) {
        const message = {
          data: {
            score: '850',
            time: '2:45',
          },
          notification: {
            title: 'FLBRMS',
            body: 'Your request booking was cancelled',
          },
        };
        await admin
          .messaging()
          .sendToDevice(_receiver.fcmToken, message)
          .then((response) => {
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });
      }

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

  async sendReplyFeedbackNotification(
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

      const _receiver = await this.accountService.getRoleOfAccount(
        payload.receiver
      );
      if (_receiver.fcmToken) {
        const message = {
          data: {
            score: '850',
            time: '2:45',
          },
          notification: {
            title: 'FLBRMS',
            body: notification.title,
          },
        };
        await admin
          .messaging()
          .sendToDevice(_receiver.fcmToken, message)
          .then((response) => {
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });
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
