import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression, Interval } from "@nestjs/schedule";
import { BookingRoomRepository } from "../repositories";
import { BookingRoomStatus } from "../enum/booking-room-status.enum";
import * as dayjs from "dayjs";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly repository: BookingRoomRepository) {
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCheckRoomBookingStillInProgress() {
    const currentTime = new Date().getTime() + 25200000;
    const next5Mins = new Date(currentTime + (1000 * 60 * 5));
    const result = await this.repository.findByBookingStatus(BookingRoomStatus.Booking, next5Mins);
    console.log(result);

  }
}
