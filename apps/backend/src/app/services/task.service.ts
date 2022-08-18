import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { BookingRoomRepository } from '../repositories';
import { BookingRoomStatus } from '../enum/booking-room-status.enum';
import * as dayjs from 'dayjs';
import { DataSource } from 'typeorm';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly repositoryBooking: BookingRoomRepository,
    private readonly dataSource: DataSource
  ) {}

  //@Cron(CronExpression.EVERY_10_SECONDS)
  async handleCheckRoomBookingStillInProgress() {
    const currentTime = new Date().getTime() + 25200000;
    const next5Mins = new Date(currentTime + 1000 * 60 * 5);
    const result = await this.repositoryBooking.findByBookingStatus(
      BookingRoomStatus.Pending,
      next5Mins
    );
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleAutoCancelBookedRequest() {
    const currDate = dayjs(new Date()).format('YYYY-MM-DD');
    const currTime = dayjs(new Date()).format('HH:mm:ss');
    try {
      const result = await this.repositoryBooking.getRequestBookedInDay(
        currDate
      );
      if (result.length > 0) {
        result.forEach(async (request) => {
          const reason =
            'Check-in time has been exceeded. Your request was automatically canceled';
          if (request.timeEnd < currTime) {
            await this.repositoryBooking.cancelRoomBookingByIdNoQueryRunner(
              null,
              request.id,
              reason,
              'System Admin'
            );
          }
        });
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        e.message || 'Error while getting booking rooms'
      );
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleAutoCancelPendingRequest() {
    const currDate = dayjs(new Date());

    try {
      const result = await this.repositoryBooking.getAllRequestPending();
      if (result.length > 0) {
        result.forEach(async (request) => {
          const reason =
            'Your request has been pending for more than 24 hours, automatically canceled';

          if (currDate.diff(request.requestedAt) >= 24 * 60 *60 * 1000) {
            await this.repositoryBooking.cancelRoomBookingByIdNoQueryRunner(
              null,
              request.id,
              reason,
              'System Admin'
            );
          }
          
        });
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        e.message || 'Error while getting booking rooms'
      );
    }
  }
}
