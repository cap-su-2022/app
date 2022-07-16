import { Repository, UpdateResult } from 'typeorm';
import { Accounts, BookingRequest, Rooms } from '../models';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { BookingRoomStatus } from '../enum/booking-room-status.enum';
import { GetBookingRoomsPaginationPayload } from '../payload/request/get-booking-rooms-pagination.payload';
import { IPaginationMeta, paginateRaw } from 'nestjs-typeorm-paginate';
import { Slot } from '../models/slot.entity';
import { BookingRequestAddRequestPayload } from '../payload/request/booking-request-add.request.payload';
import { BookingReason } from '../models/booking-reason.entity';
import { BadRequestException } from '@nestjs/common';

@CustomRepository(BookingRequest)
export class BookingRoomRepository extends Repository<BookingRequest> {
  async findByBookingStatus(status: BookingRoomStatus, next5Mins: Date) {
    return this.createQueryBuilder('booking_request')
      .where('booking_request.status = :status', { status: status })
      .andWhere('booking_request.requested_at < :time', { time: next5Mins })
      .getMany();
  }

  findByPaginationPayload(payload: GetBookingRoomsPaginationPayload) {
    const query = this.createQueryBuilder('booking_request')
      .select('booking_request.checkin_Date', 'checkinDate')
      .addSelect('booking_request.room_id', 'roomId')
      .addSelect('r.name', 'roomName')
      .addSelect('r.description', 'roomDescription')
      .addSelect('booking_request.booking_reason_id', 'reasonType')
      .addSelect('booking_request.status', 'status')
      .addSelect('booking_request.requested_at', 'bookedAt')
      .addSelect('booking_request.checkin_date', 'checkinDate')
      .addSelect('booking_request.id', 'id')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .where('r.name ILIKE :roomName', {
        roomName: `%${payload.search}%`,
      })
      .andWhere('booking_request.status LIKE :status', {
        status: `%${payload.status}%`,
      })
      .orderBy(payload.sort, payload.dir as 'ASC' | 'DESC');
    if (payload.checkInAt && payload.checkInAt !== '') {
      query.andWhere('booking_request.checkedin_at >= :checkInAt', {
        checkInAt: payload.checkInAt,
      });
    }
    if (payload.checkOutAt && payload.checkOutAt !== '') {
      query.andWhere('booking_request.checkout_at >= :checkOutAt', {
        checkOutAt: payload.checkOutAt,
      });
    }
    if (payload.checkinDate && payload.checkinDate !== '') {
      query.andWhere('booking_request.checkin_date >= :checkinDate', {
        checkinDate: payload.checkinDate,
      });
    }
    if (payload.reasonType && payload.reasonType !== '') {
      query.andWhere('booking_request.booking_reason_id = :reason', {
        reason: payload.reasonType,
      });
    }
    return paginateRaw<BookingRequest, IPaginationMeta>(query, {
      page: payload.page,
      limit: payload.limit,
    });
  }

  getBookingByRoomInWeek(payload: { roomId: string; date: string }) {
    const curr = new Date(payload.date); // get current date
    const firstDay = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    const lastDay = firstDay + 6; // last day is the first day + 6
    const sunday = new Date(curr.setDate(firstDay));
    const satuday = new Date(curr.setDate(lastDay));
    console.log('SUNNNNN: ', sunday);
    console.log('SATTTTT: ', satuday);
    const query = this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('booking_request.checkin_Date', 'checkinDate')
      .addSelect('booking_request.room_id', 'roomId')
      .addSelect('booking_request.status', 'status')
      .addSelect('booking_request.checkin_slot', 'checkinSlot')
      .addSelect('booking_request.checkout_slot', 'checkoutSlot')
      .addSelect('slot_in.slot_num', 'slotIn')
      .addSelect('slot_out.slot_num', 'slotOut')
      .innerJoin(Slot, 'slot_in', 'slot_in.id = booking_request.checkin_slot')
      .innerJoin(
        Slot,
        'slot_out',
        'slot_out.id = booking_request.checkout_slot'
      )
      .andWhere('booking_request.room_id = :roomId', { roomId: payload.roomId })
      .andWhere(
        "(booking_request.status = 'PENDING' OR booking_request.status = 'BOOKED')"
      );
    // .andWhere("booking_request.status LIKE 'PENDING'");
    if (payload.date && payload.date !== '') {
      query.andWhere('booking_request.checkin_date >= :sunday', {
        sunday: sunday,
      });
      query.andWhere('booking_request.checkin_date <= :satuday', {
        satuday: satuday,
      });
    }
    return query.getRawMany<BookingRequest>();
  }

  getBookingPendingAndBookedByDay(
    date: string
  ): Promise<{ id: string; slotIn: number; slotOut: number, status: string }[]> {
    const query = this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('slot_in.slot_num', 'slotIn')
      .addSelect('slot_out.slot_num', 'slotOut')
      .addSelect('booking_request.status', 'status')
      .innerJoin(Slot, 'slot_in', 'slot_in.id = booking_request.checkin_slot')
      .innerJoin(
        Slot,
        'slot_out',
        'slot_out.id = booking_request.checkout_slot'
      )
      .where('booking_request.checkinDate = :checkinDate', {
        checkinDate: date,
      })
      .andWhere("(booking_request.status = 'PENDING' OR booking_request.status = 'BOOKED')");
    return query.getRawMany<{ id: string; slotIn: number; slotOut: number, status: string }>();
  }

  getTotalRowCount(): Promise<number> {
    return;
  }

  findByCurrentBookingListAndAccountId(
    accountId: string
  ): Promise<BookingRequest[]> {
    return this.createQueryBuilder('booking_request')
      .select('booking_request.checkin_date', 'checkinDate')
      .addSelect('booking_request.requested_at', 'bookedAt')
      .addSelect('booking_request.status', 'status')
      .addSelect('r.name', 'roomName')
      .addSelect('booking_request.id', 'id')
      .addSelect('booking_request.requested_at', 'requestedAt')
      .addSelect('booking_request.checkedin_at', 'checkinAt')
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
      .addSelect('booking_request.checkin_Date', 'checkinDate')
      .addSelect('booking_request.booking_reason_id', 'reasonType')
      .addSelect('booking_request.description', 'description')
      .addSelect('booking_request.requested_at', 'requestedAt')
      .addSelect('booking_request.requested_by', 'requestedBy')
      .addSelect('booking_request.updated_at', 'updatedAt')
      .addSelect('booking_request.requested_at', 'bookedAt')
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
      .addSelect('booking_request.checkin_Date', 'checkinDate')

      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .where(`booking_request.status = :status`, { status: 'BOOKING' })
      .andWhere('booking_request.room_id = :room_id', { room_id: roomId })
      .orderBy('booking_request.checkin_date', 'ASC')
      .getRawMany<BookingRequest>();
  }

  getRequestBookingByAccountId(accountId: string) {
    return this.createQueryBuilder(`booking_request`)
      .select('booking_request.id', 'id')
      .addSelect('r.name', 'roomName')
      .addSelect('a.username', 'requestedBy')
      .addSelect('booking_request.checkin_Date', 'checkinDate')

      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .where(`booking_request.status = :status`, { status: 'BOOKING' })
      .andWhere('booking_request.requested_by = :account_id', {
        account_id: accountId,
      })
      .orderBy('booking_request.checkin_date', 'ASC')
      .getRawMany<BookingRequest>();
  }

  existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('booking_request')
      .select('COUNT(1)', 'count')
      .where('booking_request.id = :id', { id: id })
      .getRawOne<{ count: number }>()
      .then((data) => data?.count > 0);
  }

  isAcceptById(id: string): Promise<boolean> {
    return this.createQueryBuilder('booking_request')
      .select('COUNT(1)', 'count')
      .where('booking_request.id = :id', { id: id })
      .andWhere("booking_request.status = 'BOOKED'")
      .getRawOne<{ count: number }>()
      .then((data) => data?.count > 0);
  }

  isCancelledById(id: string): Promise<boolean> {
    return this.createQueryBuilder('booking_request')
      .select('COUNT(1)', 'count')
      .where('booking_request.id = :id', { id: id })
      .andWhere("booking_request.status = 'CANCELLED'")
      .getRawOne<{ count: number }>()
      .then((data) => data?.count > 0);
  }

  async findById(id: string): Promise<BookingRequest> {
    return this.createQueryBuilder('br')
      .select('br.id', 'id')
      .addSelect('r.id', 'roomId')
      .addSelect('r.name', 'roomName')
      .addSelect('r.description', 'roomDescription')
      .addSelect('br.checkin_Date', 'checkinDate')
      .addSelect('br.status', 'status')
      .addSelect('br.booking_reason_id', 'reasonType')
      .addSelect('br.description', 'description')
      .addSelect('br.checkedin_at', 'checkinAt')
      .addSelect('bkr.name', 'reason')
      .addSelect('br.cancelled_at', 'cancelledAt')
      .addSelect('br.requested_at', 'requestedAt')
      .addSelect('br.updated_at', 'updatedAt')
      .addSelect('a.username', 'requestedBy')
      .addSelect('aa.username', 'updatedBy')
      .addSelect('aaa.username', 'cancelledBy')
      .addSelect('s.name', 'checkinSlot')
      .addSelect('ss.name', 'checkoutSlot')
      .innerJoin(Rooms, 'r', 'r.id = br.room_id')
      .innerJoin(Accounts, 'a', 'a.id = br.requested_by')
      .leftJoin(Accounts, 'aa', 'aa.id = br.updated_by')
      .leftJoin(Accounts, 'aaa', 'aaa.id = br.cancelled_by')
      .leftJoin(Slot, 's', 's.id = br.checkin_slot')
      .leftJoin(Slot, 'ss', 'ss.id = br.checkout_slot')
      .innerJoin(BookingReason, 'bkr', 'bkr.id = br.booking_reason_id')
      .where('br.id = :id', { id: id })
      .getRawOne<BookingRequest>();
  }

  async createNewRequest(
    payload: BookingRequestAddRequestPayload,
    userId: string,
    status: string
  ) {
    return this.save(
      {
        roomId: payload.roomId,
        requestedBy: userId,
        requestedAt: new Date(),
        checkinDate: payload.checkinDate,
        checkoutDate: payload.checkoutDate,
        checkinSlot: payload.checkinSlot,
        checkoutSlot: payload.checkoutSlot,
        status: status,
        description: payload.description,
        bookingReasonId: payload.bookingReasonId,
      },
      {
        transaction: true,
      }
    );
  }

  async cancelRoomBookingById(accountId: string, id: string) {
    const oldData = await this.findOneOrFail({
      where: {
        id: id,
      },
    });
    if (oldData.requestedBy === accountId) {
      return this.save(
        {
          ...oldData,
          status: 'CANCELLED',
          updatedBy: accountId,
          updatedAt: new Date(),
        },
        {
          transaction: true,
        }
      );
    } else {
      throw new BadRequestException(
        "You are not allowed to cancel someone else's request"
      );
    }
  }

  createNewBooking(payload: BookingRequestAddRequestPayload, userId: string) {
    if (!payload.checkoutDate || payload.checkoutDate === payload.checkinDate) {
      return this.save(
        {
          roomId: payload.roomId,
          requestedBy: userId,
          requestedAt: new Date(),
          checkinDate: payload.checkinDate,
          checkoutDate: payload.checkoutDate,
          checkinSlot: payload.checkinSlot,
          checkoutSlot: payload.checkoutSlot,
          status: 'BOOKED',
          description: payload.description,
          bookingReasonId: payload.bookingReasonId,
        },
        {
          transaction: true,
        }
      );
    }
  }

  async acceptById(accountId: string, roomId: string) {
    const oldData = await this.findOneOrFail({
      where: {
        id: roomId,
      },
    });
    return this.save(
      {
        ...oldData,
        status: 'BOOKED',
        updatedBy: accountId,
        updatedAt: new Date(),
      },
      {
        transaction: true,
      }
    );
  }

  async rejectById(accountId: string, roomId: string) {
    const oldData = await this.findOneOrFail({
      where: {
        id: roomId,
      },
    });
    return this.save(
      {
        ...oldData,
        status: 'CANCELLED',
        updatedBy: accountId,
        updatedAt: new Date(),
      },
      {
        transaction: true,
      }
    );
  }
}
