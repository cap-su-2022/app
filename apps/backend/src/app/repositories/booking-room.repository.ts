import { Repository, UpdateResult } from 'typeorm';
import { Accounts, BookingRequest, Rooms } from '../models';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { BookingRoomStatus } from '../enum/booking-room-status.enum';
import { GetBookingRoomsPaginationPayload } from '../payload/request/get-booking-rooms-pagination.payload';
import { IPaginationMeta, paginateRaw } from 'nestjs-typeorm-paginate';

@CustomRepository(BookingRequest)
export class BookingRoomRepository extends Repository<BookingRequest> {
  async findByBookingStatus(status: BookingRoomStatus, next5Mins: Date) {
    return this.createQueryBuilder('booking_request')
      .where('booking_request.status = :status', { status: status })
      .andWhere('booking_request.requested_at < :time', { time: next5Mins })
      .getMany();
  }

  findByPaginationPayload(payload: GetBookingRoomsPaginationPayload) {
    console.log("TIME CHECK OUT: ", payload.checkOutAt)
    const query = this.createQueryBuilder('booking_request')
      .select('booking_request.time_checkin', 'checkInAt')
      .addSelect('booking_request.time_checkout', 'checkOutAt')
      .addSelect('booking_request.room_id', 'roomId')
      .addSelect('r.name', 'roomName')
      .addSelect('r.description', 'roomDescription')
      .addSelect('booking_request.reason_type', 'reasonType')
      .addSelect('booking_request.status', 'status')
      .addSelect('booking_request.booked_at', 'bookedAt')
      .addSelect('booking_request.id', 'id')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .where('r.name ILIKE :roomName', {
        roomName: `%${payload.search}%`,
      })
      .andWhere('booking_request.time_checkin >= :timeCheckIn', {
        timeCheckIn: payload.checkInAt,
      })
      .andWhere('booking_request.time_checkout <= :timeCheckOut', {
        timeCheckOut: payload.checkOutAt,
      })
      .andWhere('booking_request.status LIKE :status', {
        status: `%${payload.status}%`,
      })
      .orderBy(payload.sort, payload.dir as 'ASC' | 'DESC');
    if (payload.reasonType && payload.reasonType !== '') {
      query.andWhere('booking_request.reason_type = :reason', {
        reason: payload.reasonType,
      });
    }
    return paginateRaw<BookingRequest, IPaginationMeta>(query, {
      page: payload.page,
      limit: payload.limit,
    });
  }

  getTotalRowCount(): Promise<number> {
    return;
  }

  findByCurrentBookingListAndAccountId(
    accountId: string
  ): Promise<BookingRequest[]> {
    return this.createQueryBuilder('booking_request')
      .select('booking_request.time_checkin', 'timeCheckIn')
      .addSelect('booking_request.time_checkout', 'timeCheckOut')
      .addSelect('booking_request.booked_at', 'bookedAt')
      .addSelect('booking_request.status', 'status')
      .addSelect('r.name', 'roomName')
      .addSelect('booking_request.id', 'id')
      .addSelect('booking_request.requested_at', 'requestedAt')
      .addSelect('booking_request.checkin_at', 'checkinAt')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .where('booking_request.requested_by = :accountId', {
        accountId: accountId,
      })
      .andWhere(`booking_request.status IN ('BOOKING', 'BOOKED', 'CHECKED_IN')`)
      .getRawMany<BookingRequest>();
  }

  findByIdAndAccountId(accountId: string, id: string): Promise<BookingRequest> {
    return this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('booking_request.status', 'status')
      .addSelect('booking_request.time_checkin', 'timeCheckIn')
      .addSelect('booking_request.time_checkout', 'timeCheckOut')
      .addSelect('booking_request.reason_type', 'reasonType')
      .addSelect('booking_request.description', 'description')
      .addSelect('booking_request.requested_at', 'requestedAt')
      .addSelect('booking_request.requested_by', 'requestedBy')
      .addSelect('booking_request.updated_at', 'updatedAt')
      .addSelect('booking_request.booked_at', 'bookedAt')
      .addSelect('r.type', 'roomType')
      .addSelect('r.id', 'roomId')
      .addSelect('r.name', 'roomName')

      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .where('booking_request.requested_by = :accountId', {
        accountId: accountId,
      })
      .andWhere('booking_request.id = :id', { id: id })
      .getRawOne<BookingRequest>();
  }
  getRequestBookingByRoomId(roomId: string) {
    return this.createQueryBuilder(`booking_request`)
      .select('booking_request.id', 'id')
      .addSelect('r.name', 'roomName')
      .addSelect('a.username', 'requestedBy')
      .addSelect('booking_request.time_checkin', 'timeCheckin')
      .addSelect('booking_request.time_checkout', 'timeCheckout')

      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .where(`booking_request.status = :status`, { status: "BOOKING"})
      .andWhere('booking_request.room_id = :room_id', { room_id: roomId })
      .orderBy('booking_request.time_checkin', 'ASC')
      .getRawMany<BookingRequest>();
  }
  cancelRoomBookingById(accountId: string, id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('booking_request')
      .update({
        status: 'CANCELLED',
      })
      .where('booking_request.id = :id', { id: id })
      .andWhere('booking_request.requested_by = :accountId', {
        accountId: accountId,
      })
      .useTransaction(true)
      .execute();
  }

  existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('booking_request')
      .select('COUNT(1)', 'count')
      .where('booking_request.id = :id', { id: id })
      .getRawOne<{ count: number }>()
      .then((data) => data?.count > 0);
  }

  async findById(id: string): Promise<BookingRequest> {
    return this.createQueryBuilder('br')
      .select('br.id', 'id')
      .addSelect('r.id', 'roomId')
      .addSelect('r.name', 'roomName')
      .addSelect('r.description', 'roomDescription')
      .addSelect('a.username', 'requestedBy')
      .addSelect('br.time_checkin', 'timeCheckin')
      .addSelect('br.time_checkout', 'timeCheckout')
      .addSelect('br.status', 'status')
      .addSelect('br.requested_at', 'requestedAt')
      .addSelect('br.booked_at', 'bookedAt')
      .addSelect('br.updated_at', 'updatedAt')
      .addSelect('br.reason_type', 'reasonType')
      .addSelect('br.description', 'description')
      .addSelect('br.checkin_at', 'checkinAt')
      .addSelect('br.checkout_at', 'checkoutAt')
      .addSelect('aa.username', 'updatedBy')
      .innerJoin(Rooms, 'r', 'r.id = br.room_id')
      .innerJoin(Accounts, 'a', 'a.id = br.requested_by')
      .leftJoin(Accounts, 'aa', 'aa.id = br.updated_by')
      .where('br.id = :id', { id: id })
      .getRawOne<BookingRequest>();
  }
}
