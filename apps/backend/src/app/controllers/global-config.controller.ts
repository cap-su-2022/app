import {Controller, Get} from "@nestjs/common";
import dayjs = require("dayjs");

class RoomBookingLimitDate {
  startDate: string;
  endDate: string;
}

@Controller('/v1/config')
export class GlobalConfigController {

  @Get('room-booking-date-limit')
  getRoomBookingLimitDate(): Promise<RoomBookingLimitDate> {
    return Promise.resolve({
      startDate: dayjs().add(1, 'day').startOf('day').toISOString(),
      endDate: dayjs().endOf('week').endOf('day').add(15, 'day').toISOString()
    })
  }
}
