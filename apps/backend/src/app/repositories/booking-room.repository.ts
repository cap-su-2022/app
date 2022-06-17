import { Repository } from "typeorm";
import { BookingRequest } from "../models";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";
import { BookingRoomStatus } from "../enum/booking-room-status.enum";

@CustomRepository(BookingRequest)
export class BookingRoomRepository extends Repository<BookingRequest> {

  async findByBookingStatus(status: BookingRoomStatus, next5Mins: Date) {
    return this.createQueryBuilder("booking_request")
      .where("booking_request.status = :status", { status: status })
      .andWhere("booking_request.requested_at < :time", { time: next5Mins })
      .getMany();
  }
}
