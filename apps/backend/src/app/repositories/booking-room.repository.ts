import { Repository } from "typeorm";
import {BookingRequest, Rooms} from "../models";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";
import { BookingRoomStatus } from "../enum/booking-room-status.enum";
import {GetBookingRoomsPaginationPayload} from "../payload/request/get-booking-rooms-pagination.payload";

@CustomRepository(BookingRequest)
export class BookingRoomRepository extends Repository<BookingRequest> {

  async findByBookingStatus(status: BookingRoomStatus, next5Mins: Date) {
    return this.createQueryBuilder("booking_request")
      .where("booking_request.status = :status", { status: status })
      .andWhere("booking_request.requested_at < :time", { time: next5Mins })
      .getMany();
  }

  findByPaginationPayload(payload: GetBookingRoomsPaginationPayload): Promise<BookingRequest[]> {
    return this.createQueryBuilder('booking_request')
      .select('booking_request.time_checkin', 'checkInAt')
      .addSelect('booking_request.time_checkout', 'checkOutAt')
      .addSelect('booking_request.room_id', 'roomId')
      .addSelect('r.name', 'roomName')
      .addSelect('booking_request.reason_type', 'reasonType')
      .addSelect('booking_request.status', 'status')
      .addSelect('booking_request.booked_at', 'bookedAt')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .where('booking_request.reason_type LIKE :reason', {reason: `%${payload.reasonType ?? ''}%`})
      .andWhere('r.name LIKE :roomName', {roomName: `%${payload.roomName ?? ''}%`})
      .andWhere('booking_request.time_checkin >= :timeCheckIn', {timeCheckIn: payload.checkInAt})
      .andWhere('booking_request.time_checkout <= :timeCheckOut', {timeCheckOut: payload.checkOutAt})
      .orderBy('r.name', payload.sort === 'ASC' ? 'ASC' : 'DESC')
      .limit(payload.limit)
      .offset(payload.page)
      .getRawMany<BookingRequest>();
  }

  getTotalRowCount(): Promise<number> {
    return;
  }
}
