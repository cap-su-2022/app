import {Entity} from 'typeorm';
import {DataSource, QueryRunner, Repository, UpdateResult} from 'typeorm';
import {
  Accounts,
  BookingRequest,
  BookingRequestDevices,
  Rooms,
  RoomType,
} from '../models';
import {CustomRepository} from '../decorators/typeorm-ex.decorator';
import {BookingRoomStatus} from '../enum/booking-room-status.enum';
import {GetBookingRoomsPaginationPayload} from '../payload/request/get-booking-rooms-pagination.payload';
import {IPaginationMeta, paginateRaw} from 'nestjs-typeorm-paginate';
import {Slot} from '../models/slot.entity';
import {BookingRequestAddRequestPayload} from '../payload/request/booking-request-add.payload';
import {BookingReason} from '../models/booking-reason.entity';
import {BadRequestException} from '@nestjs/common';
import {GetAllBookingRequestsFilter} from '../payload/request/get-all-booking-rooms-filter.payload';
import dayjs = require('dayjs');
import {BookingRoomPaginationParams} from '../controllers/booking-room-pagination.model';

@CustomRepository(BookingRequest)
export class BookingRoomRepository extends Repository<BookingRequest> {
  async findByBookingStatus(status: BookingRoomStatus, next5Mins: Date) {
    return this.createQueryBuilder('booking_request')
      .where('booking_request.status = :status', {status: status})
      .andWhere('booking_request.requested_at < :time', {time: next5Mins})
      .getMany();
  }

  getAllRequest() {
    return this.createQueryBuilder('booking_request')
      .select('booking_request.checkin_Date', 'checkinDate')
      .addSelect('booking_request.id', 'id')
      .addSelect('booking_request.room_id', 'roomId')
      .addSelect('booking_request.status', 'status')
      .where(
        `booking_request.status IN ('BOOKED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED')`
      )
      .orderBy('booking_request.checkin_date', 'ASC')
      .getRawMany();
  }

  getRequest(id: string) {
    return this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('r.name', 'roomName')
      .addSelect('booking_request.checkin_Date', 'checkinDate')
      .addSelect('booking_request.roomId', 'roomId')
      .addSelect('booking_request.checkin_slot', 'checkinSlotId')
      .addSelect('booking_request.checkout_slot', 'checkoutSlotId')
      .addSelect('booking_request.requested_by', 'requestedBy')
      .addSelect('s.name', 'checkinSlotName')
      .addSelect('ss.name', 'checkoutSlotName')
      .addSelect('booking_request.status', 'status')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .leftJoin(Slot, 's', 's.id = booking_request.checkin_slot')
      .leftJoin(Slot, 'ss', 'ss.id = booking_request.checkout_slot')
      .where('booking_request.id = :id', {id: id})
      .getRawOne();
  }

  getCountRequestInWeekOfUser(id: string, date: string) {
    const curr = new Date(date); // get current date
    const firstDay = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    const lastDay = firstDay + 6; // last day is the first day + 6
    const sunday = new Date(curr.setDate(firstDay));
    const satuday = new Date(curr.setDate(curr.getDate() + lastDay));
    return this.createQueryBuilder('booking_request')
      .select('COUNT(1)', 'count')
      .where('booking_request.requested_by = :id', {id: id})
      .andWhere('booking_request.checkin_date >= :sunday', {
        sunday: sunday,
      })
      .andWhere('booking_request.checkin_date <= :satuday', {
        satuday: satuday,
      })
      .andWhere(`booking_request.status NOT LIKE 'CANCELLED'`)
      .getRawOne()
      .then((data) => data?.count);
  }

  findByPaginationPayload(payload: BookingRoomPaginationParams, accountId) {
    const query = this.createQueryBuilder('booking_request')
      .select('booking_request.checkin_Date', 'checkinDate')
      .addSelect('booking_request.room_id', 'roomId')
      .addSelect('r.name', 'roomName')
      .addSelect('r.description', 'roomDescription')
      .addSelect('booking_request.booking_reason_id', 'reasonType')
      .addSelect('booking_request.status', 'status')
      .addSelect('booking_request.requested_at', 'bookedAt')
      .addSelect('a.username', 'requestedBy')
      .addSelect('booking_request.checkin_date', 'checkinDate')
      .addSelect('booking_request.id', 'id')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .where('booking_request.status LIKE :status', {
        status: `%${payload.status}%`,
      })
      .andWhere('(r.name ILIKE :search OR a.username ILIKE :search)', {
        search: `%${payload.search}%`,
      })
      .orderBy(payload.sort, payload.dir as 'ASC' | 'DESC');
    if (payload.checkInAt && payload.checkInAt !== '') {
      query.andWhere('booking_request.checkedin_at >= :checkInAt', {
        checkInAt: payload.checkInAt,
      });
    }
    if (payload.checkInDate && payload.checkInDate !== '') {
      query.andWhere('booking_request.checkin_date >= :checkinDate', {
        checkinDate: payload.checkInDate,
      });
    }
    if (payload.reasonType && payload.reasonType !== '') {
      query.andWhere('booking_request.booking_reason_id = :reason', {
        reason: payload.reasonType,
      });
    }
    if (accountId) {
      // query.andWhere('booking_request.requested_by = :accountId', {
      //   accountId: accountId,
      // });

      query.andWhere('booking_request.booked_for = :accountId', {
        accountId: accountId,
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
    const satuday = new Date(curr.setDate(curr.getDate() + lastDay));
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
      .andWhere('booking_request.room_id = :roomId', {roomId: payload.roomId})
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

  getRequestPendingOfRoomInDay(
    roomId: string,
    requestId: string,
    date: string
  ): Promise<{ id: string; slotIn: number; slotOut: number; status: string }[]> {
    const query = this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('slot_in.slot_num', 'slotIn')
      .addSelect('slot_out.slot_num', 'slotOut')
      .addSelect('slot_in.name', 'slotInName')
      .addSelect('slot_out.name', 'slotOutName')
      .addSelect('a.username', 'requestedBy')
      .addSelect('r.name', 'reason')
      .addSelect('booking_request.status', 'status')
      .innerJoin(Slot, 'slot_in', 'slot_in.id = booking_request.checkin_slot')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .innerJoin(BookingReason, 'r', 'r.id = booking_request.booking_reason_id')
      .innerJoin(
        Slot,
        'slot_out',
        'slot_out.id = booking_request.checkout_slot'
      )
      .where('booking_request.checkinDate = :checkinDate', {
        checkinDate: date,
      })
      .andWhere('booking_request.room_id = :roomId', {
        roomId: roomId,
      })
      .andWhere('booking_request.id != :id', {
        id: requestId,
      })
      .andWhere("(booking_request.status = 'PENDING')");
    return query.getRawMany<{
      id: string;
      slotIn: number;
      slotOut: number;
      status: string;
    }>();
  }

  getRequestBookedInDay(date: string): Promise<{
    id: string;
    roomId: string;
    roomName: string;
    slotStart: number;
    timeStart: string;
    slotEnd: number;
    timeEnd: string;
  }[]> {
    return (
      this.createQueryBuilder('booking_request')
        .select('booking_request.id', 'id')
        .addSelect('booking_request.room_id', 'roomId')
        .addSelect('r.name', 'roomName')
        .addSelect('slot_start.slot_num', 'slotStart')
        .addSelect('slot_start.time_start', 'timeStart')
        .addSelect('slot_end.slot_num', 'slotEnd')
        .addSelect('slot_end.time_end', 'timeEnd')
        // .addSelect('slot_start.name', 'slotStart')
        // .addSelect('slot_end.name', 'slotEnd')
        .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
        .innerJoin(
          Slot,
          'slot_start',
          'slot_start.id = booking_request.checkin_slot'
        )
        .innerJoin(
          Slot,
          'slot_end',
          'slot_end.id = booking_request.checkout_slot'
        )
        .where('booking_request.checkinDate = :checkinDate', {
          checkinDate: date,
        })
        .andWhere("(booking_request.status = 'BOOKED')")
        .getRawMany<{
          id: string;
          roomId: string;
          roomName: string;
          slotStart: number;
          timeStart: string;
          slotEnd: number;
          timeEnd: string;
        }>()
    );
  }

  getRequestBookedInMultiDay(
    dateStart: string,
    dateEnd: string
  ): Promise<{
    id: string;
    roomId: string;
    roomName: string;
    slotStart: number;
    slotEnd: number;
  }[]> {
    return this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('booking_request.room_id', 'roomId')
      .addSelect('r.name', 'roomName')
      .addSelect('slot_start.slot_num', 'slotStart')
      .addSelect('slot_end.slot_num', 'slotEnd')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(
        Slot,
        'slot_start',
        'slot_start.id = booking_request.checkin_slot'
      )
      .innerJoin(
        Slot,
        'slot_end',
        'slot_end.id = booking_request.checkout_slot'
      )
      .where('booking_request.checkinDate >= :dateStart', {
        dateStart: dateStart,
      })
      .where('booking_request.checkinDate <= :dateEnd', {
        dateEnd: dateEnd,
      })
      .andWhere("(booking_request.status = 'BOOKED')")
      .getRawMany<{
        id: string;
        roomId: string;
        roomName: string;
        slotStart: number;
        slotEnd: number;
      }>();
  }

  getBookingPendingAndBookedInDay(
    date: string,
    roomId: string
  ): Promise<{
    id: string;
    slotIn: number;
    slotOut: number;
    status: string;
  }[]> {
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
      .andWhere('booking_request.room_id = :roomId', {
        roomId: roomId,
      })
      .andWhere(
        "(booking_request.status = 'PENDING' OR booking_request.status = 'BOOKED')"
      );
    return query.getRawMany<{
      id: string;
      slotIn: number;
      slotOut: number;
      status: string;
    }>();
  }

  getBookingPendingAndBookedInMultiDay(
    dateStart: string,
    dateEnd: string,
    roomId: string
  ): Promise<{
    id: string;
    slotIn: number;
    slotOut: number;
    status: string;
  }[]> {
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
      .where('booking_request.checkinDate >= :dateStart', {
        dateStart: dateStart,
      })
      .andWhere('booking_request.checkinDate <= :dateEnd', {
        dateEnd: dateEnd,
      })
      .andWhere('booking_request.room_id = :roomId', {
        roomId: roomId,
      })
      .andWhere(
        "(booking_request.status = 'PENDING' OR booking_request.status = 'BOOKED')"
      );
    return query.getRawMany<{
      id: string;
      slotIn: number;
      slotOut: number;
      status: string;
    }>();
  }

  getRequestBookedInDayOfUser(
    date: string,
    userId: string
  ): Promise<{
    id: string;
    roomName: string;
    slotIn: number;
    slotOut: number;
    status: string;
  }[]> {
    const query = this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('slot_in.slot_num', 'slotIn')
      .addSelect('slot_out.slot_num', 'slotOut')
      .addSelect('r.name', 'roomName')
      .addSelect('booking_request.status', 'status')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(Slot, 'slot_in', 'slot_in.id = booking_request.checkin_slot')
      .innerJoin(
        Slot,
        'slot_out',
        'slot_out.id = booking_request.checkout_slot'
      )
      .where('booking_request.checkinDate = :checkinDate', {
        checkinDate: date,
      })
      .andWhere('booking_request.requested_by = :userId', {
        userId: userId,
      })
      .andWhere("booking_request.status = 'BOOKED'");
    return query.getRawMany<{
      id: string;
      roomName: string;
      slotIn: number;
      slotOut: number;
      status: string;
    }>();
  }

  getTotalRowCount(): Promise<number> {
    return;
  }

  findByCurrentBookingListByAccountId(
    accountId: string
  ): Promise<BookingRequest[]> {
    return this.createQueryBuilder('booking_request')
      .select('booking_request.checkin_date', 'checkinDate')
      .addSelect('booking_request.requested_at', 'bookedAt')
      .addSelect('booking_request.status', 'status')
      .addSelect('r.name', 'roomName')
      .addSelect('s.slot_num', 'checkinSlotNum')
      .addSelect('ss.slot_num', 'checkoutSlotNum')
      .addSelect('booking_request.id', 'id')
      .addSelect('booking_request.requested_at', 'requestedAt')
      .addSelect('booking_request.checkedin_at', 'checkinAt')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(Slot, 's', 's.id = booking_request.checkin_slot')
      .innerJoin(Slot, 'ss', 'ss.id = booking_request.checkout_slot')
      .where('booking_request.requested_by = :accountId', {
        accountId: accountId,
      })
      .andWhere(`booking_request.status IN ('BOOKING', 'BOOKED', 'CHECKED_IN')`)
      .getRawMany<BookingRequest>();
  }

  // findByIdAndAccountId(accountId: string, id: string): Promise<BookingRequest> {
  //   return this.createQueryBuilder('booking_request')
  //     .select('booking_request.id', 'id')
  //     .addSelect('booking_request.status', 'status')
  //     .addSelect('booking_request.checkin_Date', 'checkinDate')
  //     .addSelect('booking_request.booking_reason_id', 'reasonType')
  //     .addSelect('booking_request.description', 'description')
  //     .addSelect('booking_request.requested_at', 'requestedAt')
  //     .addSelect('booking_request.requested_by', 'requestedBy')
  //     .addSelect('booking_request.updated_at', 'updatedAt')
  //     .addSelect('booking_request.requested_at', 'bookedAt')
  //     .addSelect('r.type', 'roomType')
  //     .addSelect('r.id', 'roomId')
  //     .addSelect('r.name', 'roomName')
  //     .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
  //     .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
  //     .where('booking_request.requested_by = :accountId', {
  //       accountId: accountId,
  //     })
  //     .andWhere('booking_request.id = :id', { id: id })
  //     .getRawOne<BookingRequest>();
  // }

  getRequestByRoomId(roomId: string) {
    const date = new Date();
    const query = this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('slot_in.slot_num', 'slotStartNum')
      .addSelect('slot_out.slot_num', 'slotEndNum')
      .addSelect('slot_in.name', 'checkinSlot')
      .addSelect('slot_out.name', 'checkoutSlot')
      .addSelect('a.username', 'requestedBy')
      .addSelect('r.name', 'roomName')
      .addSelect('booking_request.checkin_date', 'checkinDate')
      .addSelect('br.name', 'reason')
      .addSelect('booking_request.status', 'status')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(
        BookingReason,
        'br',
        'br.id = booking_request.booking_reason_id'
      )
      .innerJoin(Slot, 'slot_in', 'slot_in.id = booking_request.checkin_slot')
      .innerJoin(
        Slot,
        'slot_out',
        'slot_out.id = booking_request.checkout_slot'
      )

      .where('booking_request.checkinDate >= :toDay', {
        toDay: date,
      })
      .andWhere('booking_request.room_id = :roomId', {
        roomId: roomId,
      })
      .andWhere("booking_request.status IN ('PENDING', 'BOOKED')")
      .orderBy('booking_request.checkin_date', 'ASC');
    return query.getRawMany<{
      id: string;
      slotIn: number;
      slotOut: number;
      status: string;
      requestedBy: string;
    }>();
  }

  getRequestBySlotId(slotId: string) {
    const date = new Date();
    const query = this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('slot_in.slot_num', 'slotStartNum')
      .addSelect('slot_out.slot_num', 'slotEndNum')
      .addSelect('slot_in.name', 'checkinSlot')
      .addSelect('slot_out.name', 'checkoutSlot')
      .addSelect('a.username', 'requestedBy')
      .addSelect('r.name', 'roomName')
      .addSelect('booking_request.checkin_date', 'checkinDate')
      .addSelect('br.name', 'reason')
      .addSelect('booking_request.status', 'status')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(
        BookingReason,
        'br',
        'br.id = booking_request.booking_reason_id'
      )
      .innerJoin(Slot, 'slot_in', 'slot_in.id = booking_request.checkin_slot')
      .innerJoin(
        Slot,
        'slot_out',
        'slot_out.id = booking_request.checkout_slot'
      )
      .innerJoin(Slot, 'slot_del', 'slot_del.id = :slotId', {
        slotId: slotId,
      })
      .where('booking_request.checkinDate >= :toDay', {
        toDay: date,
      })
      .andWhere('slot_in.slot_num <= slot_del.slot_num')
      .andWhere('slot_out.slot_num >= slot_del.slot_num')
      .andWhere("booking_request.status IN ('PENDING', 'BOOKED')")
      .orderBy('booking_request.checkin_date', 'ASC');
    return query.getRawMany<{
      id: string;
      slotIn: number;
      slotOut: number;
      status: string;
      requestedBy: string;
    }>();
  }

  getRequestByDeviceId(deviceId: string) {
    const date = new Date();
    const query = this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('slot_in.slot_num', 'slotStartNum')
      .addSelect('slot_out.slot_num', 'slotEndNum')
      .addSelect('slot_in.name', 'checkinSlot')
      .addSelect('slot_out.name', 'checkoutSlot')
      .addSelect('a.username', 'requestedBy')
      .addSelect('r.name', 'roomName')
      .addSelect('booking_request.checkin_date', 'checkinDate')
      .addSelect('br.name', 'reason')
      .addSelect('booking_request.status', 'status')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(
        BookingRequestDevices,
        'brd',
        'brd.booking_request_id = booking_request.id'
      )
      .innerJoin(
        BookingReason,
        'br',
        'br.id = booking_request.booking_reason_id'
      )
      .innerJoin(Slot, 'slot_in', 'slot_in.id = booking_request.checkin_slot')
      .innerJoin(
        Slot,
        'slot_out',
        'slot_out.id = booking_request.checkout_slot'
      )

      .where('booking_request.checkinDate >= :toDay', {
        toDay: date,
      })
      .andWhere('brd.device_id = :deviceId', {
        deviceId: deviceId,
      })
      .andWhere("booking_request.status IN ('PENDING', 'BOOKED')")
      .orderBy('booking_request.checkin_date', 'ASC');
    return query.getRawMany<{
      id: string;
      slotIn: number;
      slotOut: number;
      status: string;
      roomName: string;
      requestedBy: string;
    }>();
  }

  getRequestBookingByAccountId(accountId: string) {
    return this.createQueryBuilder(`booking_request`)
      .select('booking_request.id', 'id')
      .addSelect('r.name', 'roomName')
      .addSelect('a.username', 'requestedBy')
      .addSelect('booking_request.checkin_Date', 'checkinDate')

      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .where(`booking_request.status = :status`, {status: 'BOOKING'})
      .andWhere('booking_request.requested_by = :account_id', {
        account_id: accountId,
      })
      .orderBy('booking_request.checkin_date', 'ASC')
      .getRawMany<BookingRequest>();
  }

  existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('booking_request')
      .select('COUNT(1)', 'count')
      .where('booking_request.id = :id', {id: id})
      .getRawOne<{ count: number }>()
      .then((data) => data?.count > 0);
  }

  isAcceptById(id: string): Promise<boolean> {
    return this.createQueryBuilder('booking_request')
      .select('COUNT(1)', 'count')
      .where('booking_request.id = :id', {id: id})
      .andWhere("booking_request.status = 'BOOKED'")
      .getRawOne<{ count: number }>()
      .then((data) => data?.count > 0);
  }

  isCancelledById(id: string): Promise<boolean> {
    return this.createQueryBuilder('booking_request')
      .select('COUNT(1)', 'count')
      .where('booking_request.id = :id', {id: id})
      .andWhere("booking_request.status = 'CANCELLED'")
      .getRawOne<{ count: number }>()
      .then((data) => data?.count > 0);
  }

  getCountRequestBookingPending() {
    return this.createQueryBuilder('booking_request')
      .select('COUNT(1)', 'count')
      .where("booking_request.status = 'PENDING'")
      .getRawOne<{ count: number }>();
  }

  getCountRequestBookingBooked() {
    return this.createQueryBuilder('booking_request')
      .select('COUNT(1)', 'count')
      .where("booking_request.status = 'BOOKED'")
      .getRawOne<{ count: number }>();
  }

  getCountRequestBookingCancelled() {
    return this.createQueryBuilder('booking_request')
      .select('COUNT(1)', 'count')
      .where("booking_request.status = 'CANCELLED'")
      .getRawOne<{ count: number }>();
  }

  getCountRequestBookingCheckedIn() {
    return this.createQueryBuilder('booking_request')
      .select('COUNT(1)', 'count')
      .where("booking_request.status = 'CHECKED_IN'")
      .getRawOne<{ count: number }>();
  }

  getCountRequestBookingCheckedOut() {
    return this.createQueryBuilder('booking_request')
      .select('COUNT(1)', 'count')
      .where("booking_request.status = 'CHECKED_OUT'")
      .getRawOne<{ count: number }>();
  }

  async getInforToFeedback(
    id: string
  ): Promise<{ userId: string; status: string }> {
    return this.createQueryBuilder('br')
      .select('br.booked_for', 'userId')
      .addSelect('br.status', 'status')
      .where('br.id = :id', {id: id})
      .getRawOne();
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
      .addSelect('br.requested_at', 'requestedAt')
      .addSelect('br.requested_by', 'requestedById')
      .addSelect('a.username', 'requestedBy')
      .addSelect('br.updated_at', 'updatedAt')
      .addSelect('aa.username', 'updatedBy')
      .addSelect('br.cancelled_at', 'cancelledAt')
      .addSelect('aaa.username', 'cancelledBy')
      .addSelect('aaaa.username', 'acceptedBy')
      .addSelect('br.cancel_reason', 'cancelReason')
      .addSelect('br.accepted_at', 'acceptedAt')
      .addSelect('bf.username', 'bookedFor')
      .addSelect('s.name', 'checkinSlot')
      .addSelect('s.time_start', 'checkinTime')
      .addSelect('ss.name', 'checkoutSlot')
      .addSelect('ss.time_end', 'checkoutTime')
      .addSelect('br.checkin_slot', 'checkinSlotId')
      .addSelect('br.checkout_slot', 'checkoutSlotId')
      .innerJoin(Rooms, 'r', 'r.id = br.room_id')
      .innerJoin(Accounts, 'a', 'a.id = br.requested_by')
      .leftJoin(Accounts, 'aa', 'aa.id = br.updated_by')
      .leftJoin(Accounts, 'aaa', 'aaa.id = br.cancelled_by')
      .leftJoin(Accounts, 'aaaa', 'aaaa.id = br.accepted_by')
      .leftJoin(Accounts, 'bf', 'bf.id = br.booked_for')
      .leftJoin(Slot, 's', 's.id = br.checkin_slot')
      .leftJoin(Slot, 'ss', 'ss.id = br.checkout_slot')
      .innerJoin(BookingReason, 'bkr', 'bkr.id = br.booking_reason_id')
      .where('br.id = :id', {id: id})
      .getRawOne<BookingRequest>();
  }

  async createNewRequest(
    payload: BookingRequestAddRequestPayload,
    userId: string,
    status: string,
    queryRunner: QueryRunner
  ) {
    return await queryRunner.manager.save(BookingRequest, {
      roomId: payload.roomId,
      requestedBy: userId,
      requestedAt: new Date(),
      status: status,
      bookingReasonId: payload.bookingReasonId,
      description: payload.description,
      checkinSlot: payload.checkinSlot,
      checkoutSlot: payload.checkoutSlot,
      checkinDate: payload.checkinDate,
      bookedFor: payload.bookedFor || userId,
      acceptedBy: status === 'BOOKED' ? userId : null,
      acceptedAt: status === 'BOOKED' ? new Date() : null,
    });
  }

  async cancelRoomBookingById(
    accountId: string,
    id: string,
    reason: string,
    role: string,
    queryRunner: QueryRunner
  ) {
    const oldData = await this.findOneOrFail({
      where: {
        id: id,
      },
    });
    if (
      oldData.requestedBy === accountId ||
      role === 'Librarian' ||
      role === 'System Admin'
    ) {
      return await queryRunner.manager.save(BookingRequest, {
        ...oldData,
        status: 'CANCELLED',
        cancelReason: reason,
        updatedBy: accountId,
        updatedAt: new Date(),
        cancelledBy: accountId,
        cancelledAt: new Date(),
      });
    } else {
      throw new BadRequestException(
        "You are not allowed to cancel someone else's request"
      );
    }
  }

  // createNewBooking(payload: BookingRequestAddRequestPayload, userId: string) {
  //   if (!payload.checkoutDate || payload.checkoutDate === payload.checkinDate) {
  //     return this.save(
  //       {
  //         roomId: payload.roomId,
  //         requestedBy: userId,
  //         requestedAt: new Date(),
  //         checkinDate: payload.checkinDate,
  //         checkoutDate: payload.checkoutDate,
  //         checkinSlot: payload.checkinSlot,
  //         checkoutSlot: payload.checkoutSlot,
  //         status: 'BOOKED',
  //         description: payload.description,
  //         bookingReasonId: payload.bookingReasonId,
  //       },
  //       {
  //         transaction: true,
  //       }
  //     );
  //   }
  // }

  async acceptById(
    accountId: string,
    roomId: string,
    queryRunner: QueryRunner
  ) {
    const oldData = await this.findOneOrFail({
      where: {
        id: roomId,
      },
    });
    return await queryRunner.manager.save(BookingRequest, {
      ...oldData,
      status: 'BOOKED',
      updatedBy: accountId,
      updatedAt: new Date(),
      acceptedBy: accountId,
      acceptedAt: new Date(),
    });
  }

  async rejectById(
    accountId: string,
    roomId: string,
    reason: string,
    queryRunner: QueryRunner
  ) {
    const oldData = await this.findOneOrFail({
      where: {
        id: roomId,
      },
    });
    return await queryRunner.manager.save(BookingRequest, {
      ...oldData,
      status: 'CANCELLED',
      updatedBy: accountId,
      updatedAt: new Date(),
      cancelReason: reason,
      cancelledBy: accountId,
      cancelledAt: new Date(),
    });
  }

  findBookingRoomRequestsByFilter(
    filters: GetAllBookingRequestsFilter
  ): Promise<BookingRequest[]> {
    const query = this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('r.name', 'roomName')
      .addSelect('rt.name', 'roomType')
      .addSelect('booking_request.checkin_date', 'checkinDate')
      .addSelect('st.slot_num', 'slotStart')
      .addSelect('se.slot_num', 'slotEnd')
      .addSelect('booking_request.status', 'status')
      .addSelect('a.username', 'requestedBy')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(RoomType, 'rt', 'rt.id = r.type')
      .innerJoin(Slot, 'st', 'st.id = booking_request.checkin_slot')
      .innerJoin(Slot, 'se', 'se.id = booking_request.checkout_slot')

      .where('r.name LIKE :name', {name: `%${filters.roomName}%`})
      .andWhere('booking_request.checkin_date >= :dateStart', {
        dateStart: filters.dateStart,
      })
      .andWhere('booking_request.checkin_date <= :dateEnd', {
        dateEnd: filters.dateEnd,
      })
      .andWhere('st.slot_num >= :slotStart', {
        slotStart: filters.slotStart,
      })
      .andWhere('se.slot_num <= :slotEnd', {
        slotEnd: filters.slotEnd,
      });
    if (filters.status) {
      query.andWhere('booking_request.status IN (:...status)', {
        status: JSON.parse(filters.status),
      });
    }
    return query.getRawMany<BookingRequest>();
  }

  findCurrentCheckoutInformation(accountId: string) {
    return this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('a.username', 'requestedBy')
      .addSelect('booking_request.id', 'description')
      .addSelect('booking_request.checkedin_at', 'checkedInAt')
      .addSelect('booking_request.status', 'status')
      .addSelect('st.slot_num', 'checkinSlot')
      .addSelect('se.slot_num', 'checkoutSlot')
      .addSelect('booking_request.checkin_date', 'checkinDate')
      .addSelect('r.name', 'roomName')
      .addSelect('rt.name', 'roomType')
      .addSelect('booking_request.accepted_by', 'acceptedBy')
      .addSelect('booking_request.accepted_at', 'acceptedAt')
      .addSelect('br.name', 'bookingReason')
      .innerJoin(
        BookingReason,
        'br',
        'br.id = booking_request.booking_reason_id'
      )
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(RoomType, 'rt', 'rt.id = r.type')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .innerJoin(Slot, 'st', 'st.id = booking_request.checkin_slot')
      .innerJoin(Slot, 'se', 'se.id = booking_request.checkout_slot')
      .where('booking_request.requested_by = :accountId', {
        accountId: accountId,
      })
      .andWhere('booking_request.status = :status', {status: 'CHECKED_IN'})
      .andWhere('booking_request.checkedout_at IS NULL')
      .andWhere('booking_request.checkedin_at IS NOT NULL')
      .andWhere('booking_request.accepted_by IS NOT NULL')
      .andWhere('booking_request.accepted_at IS NOT NULL')
      .andWhere('booking_request.cancelled_at IS NULL')
      .andWhere('booking_request.cancelled_by IS NULL')
      .getRawOne();
  }

  checkoutBookingRoom(id: string, accountId: string) {
    return this.createQueryBuilder('booking_request')
      .update({
        status: 'CHECKED_OUT',
        updatedAt: new Date(),
        updatedBy: accountId,
        checkedoutAt: new Date(),
      })
      .where('booking_request.id = :id', {id: id})
      .useTransaction(true)
      .execute();
  }

  findBookingRoomHistory(
    accountId: string,
    filters: GetAllBookingRequestsFilter
  ) {
    const query = this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('r.name', 'roomName')
      .addSelect('rt.name', 'roomType')
      .addSelect('booking_request.requested_at', 'requestedAt')
      .addSelect('booking_request.requested_by', 'requestedBy')
      .addSelect('booking_request.status', 'status')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(RoomType, 'rt', 'r.type = rt.id')
      .innerJoin(Slot, 'st', 'st.id = booking_request.checkin_slot')
      .innerJoin(Slot, 'se', 'se.id = booking_request.checkout_slot')
      .where('booking_request.requested_by = :accountId', {
        accountId: accountId,
      })
      .andWhere('r.name LIKE :name', {name: `%${filters.roomName}%`})
      .andWhere('booking_request.checkin_date >= :dateStart', {
        dateStart: filters.dateStart,
      })
      .andWhere('booking_request.checkin_date <= :dateEnd', {
        dateEnd: filters.dateEnd,
      })
      .andWhere('st.slot_num >= :slotStart', {
        slotStart: filters.slotStart,
      })
      .andWhere('se.slot_num <= :slotEnd', {
        slotEnd: filters.slotEnd,
      });
    if (filters.status) {
      query.andWhere('booking_request.status IN (:...status)', {
        status: JSON.parse(filters.status),
      });
    }
    return query.getRawMany();
  }

  findCurrentCheckinInformation(accountId: string) {
    return this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('booking_request.room_id', 'roomId')
      .addSelect('a.username', 'requestedBy')
      .addSelect('booking_request.requested_at', 'requestedAt')
      .addSelect('booking_request.description', 'description')
      .addSelect('br.name', 'bookingReason')
      .addSelect('r.name', 'roomName')
      .addSelect('booking_request.checkin_date', 'checkinDate')
      .addSelect('st.slot_num', 'checkinSlot')
      .addSelect('se.slot_num', 'checkoutSlot')
      .addSelect('booking_request.accepted_at', 'acceptedAt')
      .innerJoin(Slot, 'st', 'st.id = booking_request.checkin_slot')
      .innerJoin(Slot, 'se', 'se.id = booking_request.checkout_slot')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .innerJoin(Rooms, 'r', 'booking_request.room_id = r.id')
      .innerJoin(
        BookingReason,
        'br',
        'br.id = booking_request.booking_reason_id'
      )
      .where('booking_request.requested_by = :requestedBy', {
        requestedBy: accountId,
      })
      .andWhere('booking_request.status = :status', {status: 'BOOKED'})
      .andWhere('booking_request.cancelled_by IS NULL')
      .andWhere('booking_request.cancelled_at IS NULL')
      .andWhere('booking_request.checkedin_at IS NULL')
      .andWhere('booking_request.checkedout_at IS NULL')
      .orderBy('booking_request.accepted_at', 'DESC')
      .limit(1)
      .getRawOne();
  }

  attemptCheckinBookingRoom(
    accountId: string,
    bookingRequestId: string,
    signature: string
  ) {
    return this.createQueryBuilder('booking_request')
      .update({
        signatureCheckin: signature,
        updatedAt: new Date(),
        updatedBy: accountId,
      })
      .where('booking_request.id = :id', {id: bookingRequestId})
      .andWhere('booking_request.status = :status', {status: 'BOOKED'})
      .andWhere('booking_request.checkedout_at IS NULL')
      .andWhere('booking_request.checkedin_at IS NULL')
      .useTransaction(true)
      .execute();
  }

  async attemptCheckoutBookingRoom(
    accountId: string,
    bookingRequestId: string,
    signature: string
  ) {
    return this.createQueryBuilder('booking_request')
      .update({
        signatureCheckout: signature,
        updatedAt: new Date(),
        updatedBy: accountId,
      })
      .where('booking_request.id = :id', {id: bookingRequestId})
      .andWhere('booking_request.status = :status', {status: 'CHECKED_IN'})
      .andWhere('booking_request.checkedout_at IS NULL')
      .useTransaction(true)
      .execute();
  }

  async acceptCheckinById(accountId: string, id: string) {
    return this.createQueryBuilder('booking_request')
      .update({
        updatedBy: accountId,
        updatedAt: new Date(),
        checkedinAt: new Date(),
        status: 'CHECKED_IN',
      })
      .where('booking_request.id = :id', {id: id})
      .andWhere('booking_request.status = :status', {status: 'BOOKED'})
      .andWhere('booking_request.checkedin_at IS NULL')
      .useTransaction(true)
      .execute();
  }

  async rejectCheckinById(accountId: string, id: string) {
    return this.createQueryBuilder('booking_request')
      .update({
        updatedBy: accountId,
        updatedAt: new Date(),
        checkedoutAt: new Date(),
        status: 'CANCELLED',
      })
      .where('booking_request.id = :id', {id: id})
      .andWhere('booking_request.status = :status', {status: 'CHECKED_IN'})
      .andWhere('booking_request.checkedout_at IS NULL')
      .useTransaction(true)
      .execute();
  }

  async acceptCheckoutById(accountId: string, id: string) {
    return this.createQueryBuilder('booking_request')
      .update({
        updatedAt: new Date(),
        updatedBy: accountId,
        status: 'CHECKED_OUT',
        checkedoutAt: new Date(),
      })
      .where('booking_request.id = :id', {id: id})
      .useTransaction(true)
      .execute();
  }

  async rejectCheckoutById(accountId: string, id: string) {
    return this.createQueryBuilder('booking_request')
      .update({
        updatedAt: new Date(),
        updatedBy: accountId,
        status: 'CANCELLED',
        checkedoutAt: new Date(),
      })
      .where('booking_request.id = :id', {id: id})
      .useTransaction(true)
      .execute();
  }

  async findBookingRequestsByFilterAndRequestedBy(
    filters: GetAllBookingRequestsFilter,
    accountId: string
  ) {
    const query = this.createQueryBuilder('booking_request')
      .select('booking_request.id', 'id')
      .addSelect('r.name', 'roomName')
      .addSelect('rt.name', 'roomType')
      .addSelect('booking_request.checkin_date', 'checkinDate')
      .addSelect('st.slot_num', 'slotStart')
      .addSelect('se.slot_num', 'slotEnd')
      .addSelect('booking_request.status', 'status')
      .addSelect('a.username', 'requestedBy')
      .innerJoin(Accounts, 'a', 'a.id = booking_request.requested_by')
      .innerJoin(Rooms, 'r', 'r.id = booking_request.room_id')
      .innerJoin(RoomType, 'rt', 'rt.id = r.type')
      .innerJoin(Slot, 'st', 'st.id = booking_request.checkin_slot')
      .innerJoin(Slot, 'se', 'se.id = booking_request.checkout_slot')

      .where('r.name LIKE :name', {name: `%${filters.roomName}%`})
      .andWhere('a.id = :accountId', {accountId: accountId})
      .andWhere('booking_request.checkin_date >= :dateStart', {
        dateStart: filters.dateStart,
      })
      .andWhere('booking_request.checkin_date <= :dateEnd', {
        dateEnd: filters.dateEnd,
      })
      .andWhere('st.slot_num >= :slotStart', {
        slotStart: filters.slotStart,
      })
      .andWhere('se.slot_num <= :slotEnd', {
        slotEnd: filters.slotEnd,
      });
    if (filters.status) {
      query.andWhere('booking_request.status IN (:...status)', {
        status: JSON.parse(filters.status),
      });
    }
    return query.getRawMany<BookingRequest>();
  }
}
