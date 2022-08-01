import {Injectable, Logger} from "@nestjs/common";
import {Cron, CronExpression, Interval} from "@nestjs/schedule";
import {BookingRoomRepository} from "../repositories";
import {BookingRoomStatus} from "../enum/booking-room-status.enum";
import * as dayjs from "dayjs";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly repositoryBooking: BookingRoomRepository) {
  }

  //@Cron(CronExpression.EVERY_10_SECONDS)
  async handleCheckRoomBookingStillInProgress() {
    const currentTime = new Date().getTime() + 25200000;
    const next5Mins = new Date(currentTime + (1000 * 60 * 5));
    const result = await this.repositoryBooking.findByBookingStatus(BookingRoomStatus.Pending, next5Mins);
    console.log(result);

  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  async handleAutoCancelBookedRequest() {
    const currDate = dayjs(new Date()).format("YYYY-MM-DD")
    const currTime = dayjs(new Date()).format("HH:mm:ss")
    const result = await this.repositoryBooking.getRequestBookedInDay(currDate);
    result.map(re => {
      console.log(re.timeEnd)
      if (re.timeEnd < currTime) {
        console.log("CANCEl NÓOOOO")
      }
    })

  }
}

