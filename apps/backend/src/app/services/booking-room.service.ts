import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common';
import {RoomsService} from './rooms.service';
import {BookingRoomRepository} from '../repositories';
import {BookingRoomResponseDTO} from '../dto/booking-room.response.dto';
import {WishlistBookingRoomResponseDTO} from '../dto/wishlist-booking-room.response.dto';
import {RoomWishlistService} from './room-wishlist.service';
import {WishlistBookingRoomRequestDTO} from '../dto/wishlist-booking-room.request.dto';
import {BookingRoomsFilterRequestPayload} from '../payload/request/booking-rooms.request.payload';
import {KeycloakUserInstance} from '../dto/keycloak.user';
import {RemoveWishlistRequest} from '../payload/request/remove-from-booking-room-wishlist.request.payload';
import {DevicesService} from './devices.service';
import {AccountsService} from './accounts.service';
import {ChooseBookingRoomFilterPayload} from '../payload/request/choose-booking-room-filter.payload';
import {GetBookingRoomsPaginationPayload} from '../payload/request/get-booking-rooms-pagination.payload';
import {BookingRequest, Devices} from '../models';
import {RoomTypeService} from './room-type.service';
import {BookingRequestAddRequestPayload} from '../payload/request/booking-request-add.payload';
import {BookingRequestHistService} from './booking-room-hist.service';
import {SlotService} from './slot.service';
import dayjs = require('dayjs');
import {DataSource, QueryRunner} from 'typeorm';
import {BookingRoomDevicesService} from './booking-request-devices.service';
import {GetAllBookingRequestsFilter} from '../payload/request/get-all-booking-rooms-filter.payload';
import {NotificationService} from './notification.service';
import {BookingRoomPaginationParams} from '../controllers/booking-room-pagination.model';

@Injectable()
export class BookingRoomService {
  private readonly logger = new Logger(BookingRoomService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly repository: BookingRoomRepository,
    private readonly notificationService: NotificationService,
    private readonly roomWishlistService: RoomWishlistService,
    private readonly accountService: AccountsService,
    @Inject(forwardRef(() => SlotService))
    private readonly slotService: SlotService,
    @Inject(forwardRef(() => RoomsService))
    private readonly roomService: RoomsService,
    @Inject(forwardRef(() => RoomTypeService))
    private readonly roomTypeService: RoomTypeService,
    private readonly bookingRoomDeviceService: BookingRoomDevicesService,
    private readonly histService: BookingRequestHistService
  ) {
  }

  private getExampleStatistics() {
    return {
      totalTime: {
        total: 0,
        booked: 0,
        cancelled: 0,
      },
      month: {
        total: 0,
        booked: 0,
        cancelled: 0,
      },
      week: {
        total: 0,
        booked: 0,
        cancelled: 0,
      },
      day: {
        total: 0,
        booked: 0,
        cancelled: 0,
      },
    };
  }

  async getStatistics() {
    const result = this.getExampleStatistics();
    const today = new Date().setHours(0, 0, 0, 0);
    const curr = new Date();
    const firstDayInWeek = curr.getDate() - curr.getDay() + 2; // First day is the day of the month - the day of the week
    const lastDayInWeek = firstDayInWeek + 6; // last day is the first day + 6
    const sunday = new Date(curr.setDate(firstDayInWeek)).setHours(0, 0, 0, 0);
    const satuday = new Date(curr.setDate(lastDayInWeek)).setHours(0, 0, 0, 0);
    const firstDayInMonth = new Date(curr.setDate(2)).setHours(0, 0, 0, 0);
    const lastDayInMonth = new Date(
      curr.getFullYear(),
      curr.getMonth() + 1,
      1
    ).setHours(0, 0, 0, 0);
    const allRequest = await this.repository.getAllRequest();

    for (let i = 0; i < allRequest.length; i++) {
      const checkinDate = allRequest[i].checkinDate.setHours(0, 0, 0, 0);
      if (checkinDate === today) {
        result.day.total += 1;
      }
      if (checkinDate >= sunday && checkinDate <= satuday) {
        // console.log("INWEEK: ", allRequest[i].checkinDate)
        result.week.total += 1;
      }
      if (checkinDate >= firstDayInMonth && checkinDate <= lastDayInMonth) {
        result.month.total += 1;
      }
      result.totalTime.total += 1;
      if (
        allRequest[i].status === 'BOOKED' ||
        allRequest[i].status === 'CHECKED_IN' ||
        allRequest[i].status === 'CHECKED_OUT'
      ) {
        if (checkinDate === today) {
          result.day.booked += 1;
        }
        if (checkinDate >= sunday && checkinDate <= satuday) {
          result.week.booked += 1;
        }
        if (checkinDate >= firstDayInMonth && checkinDate <= lastDayInMonth) {
          result.month.booked += 1;
        }
        result.totalTime.booked += 1;
      } else {
        if (checkinDate === today) {
          result.day.cancelled += 1;
        }
        if (checkinDate >= sunday && checkinDate <= satuday) {
          result.week.cancelled += 1;
        }
        if (checkinDate >= firstDayInMonth && checkinDate <= lastDayInMonth) {
          result.month.cancelled += 1;
        }
        result.totalTime.cancelled += 1;
      }
    }

    console.log(result);
    return result;
  }

  async getCountRequestInWeekOfUser(id: string, date: string) {
    try {
      const result = {
        usedBookingTime: 0,
        totalBookingTime: 3,
      };
      result.usedBookingTime = Number(
        await this.repository.getCountRequestInWeekOfUser(id, date)
      );
      return result;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        e.message || 'Error while getting booking rooms'
      );
    }
  }

  // async getBookingRooms(
  //   payload: BookingRoomsFilterRequestPayload
  // ): Promise<BookingRoomResponseDTO[]> {
  //   try {
  //     const rooms = await this.roomService.getAllWithoutPagination();
  //     const result: BookingRoomResponseDTO[] = [];
  //     let counter = 1;
  //     for (let i = 0; i < rooms.length; i++) {
  //       for (let j = 1; j <= 6; j++) {
  //         result.push({
  //           stt: counter++,
  //           roomId: rooms[i].id,
  //           roomName: rooms[i].name,
  //           slot: j,
  //         });
  //       }
  //     }
  //     console.log(payload.search);
  //     console.log(
  //       result.filter((bookingRoom) =>
  //         bookingRoom.roomName.includes(payload.search)
  //       )
  //     );
  //     return result.filter((bookingRoom) =>
  //       bookingRoom.roomName.includes(payload.search)
  //     );
  //   } catch (e) {
  //     this.logger.error(e.message);
  //     throw new BadRequestException('Error while getting booking rooms');
  //   }
  // }

  async getRequestByRoomId(roomId: string) {
    try {
      if (roomId === '') {
        throw new BadRequestException('Please type a room ID');
      }
      return await this.repository.getRequestByRoomId(roomId);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        e.message ||
        'An error occurred while getting request by room id ' + roomId
      );
    }
  }

  async getRequestBySlotId(slotId: string) {
    try {
      if (slotId === '') {
        throw new BadRequestException('Please type a slot ID');
      }
      return await this.repository.getRequestBySlotId(slotId);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getRequestByDeviceId(deviceId: string) {
    try {
      if (deviceId === '') {
        throw new BadRequestException('Please type a device ID');
      }
      return await this.repository.getRequestByDeviceId(deviceId);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getRequestBookingByAccountId(
    accountId: string
  ): Promise<BookingRequest[]> {
    try {
      return await this.repository.getRequestBookingByAccountId(accountId);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'An error occurred while getting request by account id ' + accountId
      );
    }
  }

  async getDevicesUseInRequest(requestId: string): Promise<BookingRequest[]> {
    try {
      return await this.bookingRoomDeviceService.findByRequestId(requestId);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'An error occurred while getting request by account id ' + requestId
      );
    }
  }

  async getWishlistBookingRooms(
    roomName: string,
    slotFrom: number,
    slotTo: number,
    accountId: string
  ): Promise<WishlistBookingRoomResponseDTO[]> {
    try {
      return await this.roomWishlistService.findAllWishlistBookingRooms(
        roomName,
        slotFrom,
        slotTo,
        accountId
      );
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('An error occurred while adding this room');
    }
  }

  async addToBookingRoomWishlist(
    accountId: string,
    wishlist: WishlistBookingRoomRequestDTO
  ) {
    try {
      return await this.roomWishlistService.addToWishlist(accountId, wishlist);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        e.message ?? 'Error while adding to booking room wish list'
      );
    }
  }

  async removeFromBookingRoomWishlist(
    user: KeycloakUserInstance,
    payload: RemoveWishlistRequest
  ) {
    try {
      return await this.roomWishlistService.removeFromWishlist(
        user.account_id,
        payload
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        e.message ?? 'Error while removing from booking room wishlist'
      );
    }
  }

  // getBookingRoomDevices(name: string, type: string, sort: string) {
  //   return this.deviceService.getBookingRoomDeviceList(name, type, sort);
  // }

  async getUsernameList(): Promise<string[]> {
    return await this.accountService.getUsernameList();
  }

  async getRoomNames(): Promise<Devices[]> {
    return await this.roomService.getRoomNames();
  }

  // async getChoosingBookingRooms(filter: string) {
  //   try {
  //     const payload = filter
  //       ? (JSON.parse(filter) as ChooseBookingRoomFilterPayload)
  //       : ({
  //           roomName: {
  //             name: '',
  //             sort: 'ASC',
  //           },
  //           roomType: {
  //             name: 'e6f085ec',
  //             sort: 'ASC',
  //           },
  //         } as ChooseBookingRoomFilterPayload);
  //     if (payload.roomType.name.length > 0) {
  //       const isExisted = await this.roomTypeService.existsById(
  //         payload.roomType.name
  //       );
  //       if (!isExisted) {
  //         throw new BadRequestException(
  //           'Room type does not exist with provided id'
  //         );
  //       }
  //     }
  //     return this.roomService.getRoomsFilterByNameAndType(payload);
  //   } catch (e) {
  //     this.logger.error(e.message);
  //     throw new BadRequestException(e.message);
  //   }
  // }

  async getAllBookingRoomsPagination(
    payload: BookingRoomPaginationParams,
    accountId
  ) {
    try {
      const role = await this.accountService.getRoleOfAccount(accountId);
      let filterByAccountId = null;
      if (role.role_name === 'Staff') {
        filterByAccountId = accountId;
      }
      const result = await this.repository.findByPaginationPayload(
        payload,
        filterByAccountId
      );
      if (
        result.meta.totalPages > 0 &&
        result.meta.currentPage > result.meta.totalPages
      ) {
        throw new BadRequestException('Current page is over');
      }

      return result;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async checkSlotOverTime(payload: { slotin: string; date: string }) {
    try {
      const today = dayjs(new Date()).format('YYYY-MM-DD');
      const currTime = dayjs(new Date()).format('HH:mm:ss');
      if (today === payload.date) {
        const slot = await this.slotService.getById(payload.slotin);
        if (currTime > slot.timeStart) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getBookingByRoomInWeek(payload: { roomId: string; date: string }) {
    try {
      return await this.repository.getBookingByRoomInWeek(payload);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getRequestPendingOfRoomInDay(
    roomId: string,
    requestId: string,
    date: string
  ) {
    try {
      return this.repository.getRequestPendingOfRoomInDay(
        roomId,
        requestId,
        date
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getRequestOfRoomWithSameSlot(payload: {
    roomId: string;
    date: string;
    requestId: string;
    checkinSlotId: string;
    checkoutSlotId: string;
  }) {
    try {
      console.log('PAYLOAD: ', payload);
      const slotIn = await this.slotService.getNumOfSlot(payload.checkinSlotId);
      const slotOut = await this.slotService.getNumOfSlot(
        payload.checkoutSlotId
      );
      const listRequestPending = await this.getRequestPendingOfRoomInDay(
        payload.roomId,
        payload.requestId,
        payload.date
      );
      if (listRequestPending.length > 0) {
        const listResult = listRequestPending.filter((request) => {
          for (let j = request.slotIn; j <= request.slotOut; j++) {
            if (j >= slotIn.slotNum && j <= slotOut.slotNum) {
              return request;
            }
          }
        });
        return listResult;
      }
      return null;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getListRequestBookedInDayAndSlot(payload: {
    date: string;
    checkinSlotId: string;
    checkoutSlotId: string;
  }) {
    try {
      const listRequestBookedInDay =
        await this.repository.getRequestBookedInDay(payload.date);

      if (listRequestBookedInDay.length > 0) {
        const slotIn = await this.slotService.getNumOfSlot(
          payload.checkinSlotId
        );
        const slotOut = await this.slotService.getNumOfSlot(
          payload.checkoutSlotId
        );

        const listRequestBookedInDayAndSlot = listRequestBookedInDay.filter(
          (request) => {
            for (let j = request.slotStart; j <= request.slotEnd; j++) {
              if (j >= slotIn.slotNum && j <= slotOut.slotNum) {
                return request;
              }
            }
          }
        );
        return listRequestBookedInDayAndSlot;
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getListRequestBookedInMultiDay(payload: {
    dateStart: string;
    dateEnd: string;
    checkinSlot: number;
    checkoutSlot: number;
  }) {
    try {
      const listRequestBookedInMultiDay =
        await this.repository.getRequestBookedInMultiDay(
          payload.dateStart,
          payload.dateEnd
        );
      if (listRequestBookedInMultiDay.length > 0) {
        const listRequestBookedInMultiDayAndSlot =
          listRequestBookedInMultiDay.filter((request) => {
            for (let j = request.slotStart; j <= request.slotEnd; j++) {
              if (j >= payload.checkinSlot && j <= payload.checkoutSlot) {
                return request;
              }
            }
          });
        return listRequestBookedInMultiDayAndSlot;
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getListRequestBookedInMultiDayV2(payload: {
    dateStart: string;
    dateEnd: string;
    checkinSlotId: string;
    checkoutSlotId: string;
  }) {
    try {
      const listRequestBookedInMultiDay =
        await this.repository.getRequestBookedInMultiDay(
          payload.dateStart,
          payload.dateEnd
        );
      if (listRequestBookedInMultiDay.length > 0) {
        const slotIn = await this.slotService.getNumOfSlot(
          payload.checkinSlotId
        );
        const slotOut = await this.slotService.getNumOfSlot(
          payload.checkoutSlotId
        );
        const listRequestBookedInMultiDayAndSlot =
          listRequestBookedInMultiDay.filter((request) => {
            for (let j = request.slotStart; j <= request.slotEnd; j++) {
              if (j >= slotIn.slotNum && j <= slotOut.slotNum) {
                return request;
              }
            }
          });
        return listRequestBookedInMultiDayAndSlot;
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getRoomFreeAtTime(payload: {
    date: string;
    checkinSlotId: string;
    checkoutSlotId: string;
  }) {
    try {
      const listRequestBookedInDaySameSlot =
        await this.getListRequestBookedInDayAndSlot(payload);
      const listRoomBookedInDaySameSlot = [];
      if (listRequestBookedInDaySameSlot?.length > 0) {
        listRequestBookedInDaySameSlot.map((request) => {
          listRoomBookedInDaySameSlot.push(request.roomId);
        });
      }
      const result = await this.roomService.filterRoomFreeByRoomBooked(
        listRoomBookedInDaySameSlot
      );
      console.log('LIST ROOM FREE: ', result);
      return result;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getRoomFreeAtMultiDate(payload: {
    dateStart: string;
    dateEnd: string;
    checkinSlot: number;
    checkoutSlot: number;
  }) {
    try {
      const listRequestBookedInMultiDay =
        await this.getListRequestBookedInMultiDay(payload);
      const listRoomBookedInMultiDaySameSlot = [];
      if (listRequestBookedInMultiDay?.length > 0) {
        listRequestBookedInMultiDay.map((request) => {
          listRoomBookedInMultiDaySameSlot.push(request.roomId);
        });
      }
      const result = await this.roomService.filterRoomFreeByRoomBooked(
        listRoomBookedInMultiDaySameSlot
      );
      return result;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getRoomFreeAtMultiDateV2(payload: {
    dateStart: string;
    dateEnd: string;
    checkinSlotId: string;
    checkoutSlotId: string;
  }) {
    try {
      const listRequestBookedInMultiDay =
        await this.getListRequestBookedInMultiDayV2(payload);
      const listRoomBookedInMultiDaySameSlot = [];
      if (listRequestBookedInMultiDay?.length > 0) {
        listRequestBookedInMultiDay.map((request) => {
          listRoomBookedInMultiDaySameSlot.push(request.roomId);
        });
      }
      const result = await this.roomService.filterRoomFreeByRoomBooked(
        listRoomBookedInMultiDaySameSlot
      );
      return result;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getCurrentRoomBookingList(accountId: string) {
    try {
      return await this.repository.findByCurrentBookingListByAccountId(
        accountId
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  // getCurrentRoomBookingDetail(accountId: string, id: string) {
  //   try {
  //     return this.repository.findByIdAndAccountId(accountId, id);
  //   } catch (e) {
  //     this.logger.error(e.message);
  //     throw new BadRequestException(e.message);
  //   }
  // }

  async getInforToFeedback(id: string) {
    try {
      const user = await this.repository.getInforToFeedback(id);
      if (user) {
        return user;
      } else {
        throw new BadRequestException('Not found request with provided id');
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getBookingRoomById(id: string) {
    try {
      const requestInfo = await this.repository.findById(id);
      console.log(requestInfo);
      if (requestInfo) {
        const listDevice = await this.bookingRoomDeviceService.findByRequestId(
          id
        );
        return {
          ...requestInfo,
          listDevice: listDevice,
        };
      } else {
        throw new BadRequestException('Not found request with provided id');
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getCountRequestBooking() {
    try {
      return await this.repository.getCountRequestBooking();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }


  async addNewRequest(
    payload: BookingRequestAddRequestPayload,
    userId: string
  ): Promise<BookingRequest> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const role = await this.accountService.getRoleOfAccount(userId);
      const slotIn = await this.slotService.getNumOfSlot(payload.checkinSlot);
      const slotOut = await this.slotService.getNumOfSlot(payload.checkoutSlot);

      const dateChoosed = new Date(payload.checkinDate).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);

      await this.roomService.findById(payload.roomId);

      if (dateChoosed < today) {
        throw new BadRequestException(
          'Are you trying to make a booking in the past? Are you crazy?'
        );
      } else if (dateChoosed === today) {
        const timeCheckin = slotIn.timeStart;
        const timeNow = dayjs(new Date()).format('HH:mm:ss');

        if (timeCheckin < timeNow) {
          throw new BadRequestException('The slot you chose is now over!');
        }
      }
      if (slotIn.slotNum > slotOut.slotNum) {
        throw new BadRequestException(
          'Have error when booking, slot start > slot end'
        );
      }

      if (
        payload.bookedFor &&
        payload.bookedFor !== userId &&
        role.role_name === 'Staff'
      ) {
        throw new BadRequestException(
          'You are not authorized to make a booking for other users!'
        );
      }

      let alreadyBookedOtherRoom = '';
      const listRequestBookedInDayOfUser =
        await this.repository.getRequestBookedInDayOfUser(
          payload.checkinDate,
          payload.bookedFor || userId
        );
      if (listRequestBookedInDayOfUser.length > 0) {
        listRequestBookedInDayOfUser.map(async (request) => {
          for (let j = request.slotIn; j <= request.slotOut; j++) {
            if (j >= slotIn.slotNum && j <= slotOut.slotNum) {
              alreadyBookedOtherRoom = request.roomName;
              break;
            }
          }
        });
      }
      if (alreadyBookedOtherRoom !== '') {
        throw new BadRequestException(
          payload.bookedFor
            ? `This user have bookings for ${alreadyBookedOtherRoom} at same slot!`
            : `You already have bookings for ${alreadyBookedOtherRoom} at same slot!`
        );
      }

      const listRequestPeningAndBookedInDay =
        await this.repository.getBookingPendingAndBookedInDay(
          payload.checkinDate,
          payload.roomId
        );

      let status = 'PENDING';
      let haveRequestBooked = false;

      if (role.role_name === 'Librarian' || role.role_name === 'System Admin') {
        status = 'BOOKED';
      }
      // if (role.role_name === 'Staff') {
      //   const countRequestInWeek = Number(
      //     await this.repository.getCountRequestInWeekOfUser(
      //       userId,
      //       payload.checkinDate
      //     )
      //   );
      //   if (countRequestInWeek >= 3) {
      //     throw new BadRequestException(
      //       'You have run out of bookings for this week'
      //     );
      //   }
      // }
      if (listRequestPeningAndBookedInDay.length > 0) {
        listRequestPeningAndBookedInDay.map(async (request) => {
          for (let j = request.slotIn; j <= request.slotOut; j++) {
            if (j >= slotIn.slotNum && j <= slotOut.slotNum) {
              if (request.status === 'PENDING') {
                // j is slot of request pending
                if (
                  role.role_name === 'Librarian' ||
                  role.role_name === 'System Admin'
                ) {
                  const reason =
                    'This room is given priority for another request';
                  this.repository.rejectById(
                    userId,
                    request.id,
                    reason,
                    queryRunner
                  );
                  break;
                }
              } else if (request.status === 'BOOKED') {
                haveRequestBooked = true;
                break;
              }
            }
          }
        });
      }

      if (haveRequestBooked) {
        throw new BadRequestException(
          'Already have request booked in this slot, try another slot'
        );
      }

      const request = await this.repository.createNewRequest(
        payload,
        userId,
        status,
        queryRunner
      );

      await this.bookingRoomDeviceService.addDeviceToRequest(
        request.id,
        payload.listDevice,
        queryRunner
      );

      if (payload.bookedFor && payload.bookedFor !== userId) {
        const roomName = await this.roomService.getRoomName(request.roomId);
        await this.notificationService.sendBookedForNotification(
          dayjs(request.checkinDate).format('DD-MM-YYYY'),
          slotIn.name,
          slotOut.name,
          roomName.name,
          role.username,
          request.bookedFor,
          queryRunner
        );
      }

      // await this.histService.createNew(request, queryRunner);

      await queryRunner.commitTransaction();

      return request;
    } catch (e) {
      this.logger.error(e.message);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    }
  }

  async addMultiRequest(
    payload: BookingRequestAddRequestPayload,
    userId: string
  ): Promise<BookingRequest[]> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const role = await this.accountService.getRoleOfAccount(userId);
      const slotIn = await this.slotService.getNumOfSlot(payload.checkinSlot);
      const slotOut = await this.slotService.getNumOfSlot(payload.checkoutSlot);

      const dateChoosed = new Date(payload.checkinDate).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);

      if (dateChoosed < today) {
        throw new BadRequestException(
          'Are you trying to make a booking in the past? Are you crazy?'
        );
      } else if (dateChoosed === today) {
        const timeCheckin = slotIn.timeStart;
        const timeNow = dayjs(new Date()).format('HH:mm:ss');

        if (timeCheckin < timeNow) {
          throw new BadRequestException('The slot you chose is now over!');
        }
      }
      if (slotIn.slotNum > slotOut.slotNum) {
        throw new BadRequestException(
          'Have error when booking, slot start > slot end'
        );
      }

      const fromDate = new Date(payload.checkinDate);
      const toDate = new Date(payload.checkoutDate);

      if (fromDate > toDate) {
        throw new BadRequestException(
          'Have error when booking, from date > to date'
        );
      }

      let alreadyBookedOtherRoom = [];
      const listRequestBookedInDayOfUser = [];
      for (
        let i = new Date(fromDate);
        i <= toDate;
        i.setDate(i.getDate() + 1)
      ) {
        const result = await this.repository.getRequestBookedInDayOfUser(
          dayjs(i).format('YYYY-MM-DD'),
          userId
        );
        if (result.length > 0) {
          listRequestBookedInDayOfUser.push(...result);
        }
      }

      if (listRequestBookedInDayOfUser.length > 0) {
        listRequestBookedInDayOfUser.map(async (request) => {
          for (let j = request.slotIn; j <= request.slotOut; j++) {
            if (j >= slotIn.slotNum && j <= slotOut.slotNum) {
              alreadyBookedOtherRoom = [
                ...alreadyBookedOtherRoom,
                request.roomName,
              ];
              break;
            }
          }
        });
      }
      if (alreadyBookedOtherRoom.length > 0) {
        throw new BadRequestException(
          `You already have bookings for ${alreadyBookedOtherRoom} at same slot!`
        );
      }

      const listRequestPeningAndBookedInDay =
        await this.repository.getBookingPendingAndBookedInMultiDay(
          payload.checkinDate,
          payload.checkoutDate,
          payload.roomId
        );

      for (
        let i = new Date(fromDate);
        i <= toDate;
        i.setDate(i.getDate() + 1)
      ) {
        const result = await this.repository.getRequestBookedInDayOfUser(
          dayjs(i).format('YYYY-MM-DD'),
          userId
        );
        if (result.length > 0) {
          listRequestBookedInDayOfUser.push(...result);
        }
      }

      let status = 'PENDING';
      let haveRequestBooked = false;

      if (role.role_name === 'Librarian' || role.role_name === 'System Admin') {
        status = 'BOOKED';
      }

      if (listRequestPeningAndBookedInDay.length > 0) {
        listRequestPeningAndBookedInDay.map(async (request) => {
          for (let j = request.slotIn; j <= request.slotOut; j++) {
            if (j >= slotIn.slotNum && j <= slotOut.slotNum) {
              if (request.status === 'PENDING') {
                // j is slot of request pending
                if (
                  role.role_name === 'Librarian' ||
                  role.role_name === 'System Admin'
                ) {
                  const reason =
                    'This room is given priority for another request';
                  this.repository.rejectById(
                    userId,
                    request.id,
                    reason,
                    queryRunner
                  );
                  break;
                }
              } else if (request.status === 'BOOKED') {
                haveRequestBooked = true;
                break;
              }
            }
          }
        });
      }

      if (haveRequestBooked) {
        throw new BadRequestException(
          'Already have request booked in this slot, try another slot'
        );
      }

      const listRequestAdded = [];

      for (
        let z = new Date(fromDate);
        z <= toDate;
        z.setDate(z.getDate() + 1)
      ) {
        const newPayload = {
          ...payload,
          checkinDate: dayjs(z).format('YYYY-MM-DD'),
        };

        const request = await this.repository.createNewRequest(
          newPayload,
          userId,
          status,
          queryRunner
        );
        listRequestAdded.push(request);
        await this.bookingRoomDeviceService.addDeviceToRequest(
          request.id,
          payload.listDevice,
          queryRunner
        );
        // await this.histService.createNew(request, queryRunner);
      }

      await queryRunner.commitTransaction();

      return listRequestAdded;
    } catch (e) {
      this.logger.error(e.message);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    }
  }

  async acceptById(accountId: string, id: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const request = await this.repository.getRequest(id);
      if (!request) {
        throw new BadRequestException(
          'Request does not found with the provided id'
        );
      }
      const isAccepted = await this.repository.isAcceptById(id);
      if (isAccepted) {
        throw new BadRequestException('Request already accepted!');
      }

      const isCancelled = await this.repository.isCancelledById(id);
      if (isCancelled) {
        throw new BadRequestException('Request already cancelled!');
      }

      const listRequestSameSlot = await this.getRequestOfRoomWithSameSlot({
        roomId: request.roomId,
        date: dayjs(request.checkinDate).format('YYYY-MM-DD'),
        requestId: request.id,
        checkinSlotId: request.checkinSlotId,
        checkoutSlotId: request.checkoutSlotId,
      });
      console.log('list request same slot: ', listRequestSameSlot);
      if (listRequestSameSlot) {
        const reason = 'This room is given priority for another request';
        listRequestSameSlot.forEach((requestSameSlot) => {
          this.repository.rejectById(
            accountId,
            requestSameSlot.id,
            reason,
            queryRunner
          );
        });
      }
      const requestAccepted = await this.repository.acceptById(
        accountId,
        id,
        queryRunner
      );

      await this.notificationService.sendAcceptRequestNotification(
        dayjs(request.checkinDate).format('DD-MM-YYYY'),
        request.checkinSlotName,
        request.checkoutSlotName,
        request.roomName,
        request.requestedBy,
        queryRunner
      );

      await queryRunner.commitTransaction();
      return requestAccepted;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(
        e.message ?? 'Error occurred while accept request'
      );
    }
  }

  async reject(
    accountId: string,
    id: string,
    reason: string,
    queryRunner: QueryRunner
  ) {
    const requestRejected = await this.repository.rejectById(
      accountId,
      id,
      reason,
      queryRunner
    );

    const request = await this.repository.getRequest(id);

    this.notificationService.sendRejectRequestNotification(
      dayjs(request.checkinDate).format('DD-MM-YYYY'),
      request.checkinSlotName,
      request.checkoutSlotName,
      request.roomName,
      reason,
      request.requestedBy,
      queryRunner
    );

    return requestRejected;
  }

  async rejectById(accountId: string, id: string, reason: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Request does not found with the provided id'
        );
      }
      const isAccepted = await this.repository.isAcceptById(id);
      if (isAccepted) {
        throw new BadRequestException('Request already accepted!');
      }

      const isCancelled = await this.repository.isCancelledById(id);
      if (isCancelled) {
        throw new BadRequestException('Request already cancelled!');
      }

      const requestRejected = this.reject(accountId, id, reason, queryRunner);

      await queryRunner.commitTransaction();
      return requestRejected;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();

      throw new BadRequestException(
        e.message ?? 'Error occurred while reject request'
      );
    }
  }

  async cancelRequest(
    accountId: string,
    id: string,
    reason: string,
    queryRunner: QueryRunner
  ) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Request does not found with the provided id'
        );
      }
      const isCancelled = await this.repository.isCancelledById(id);
      if (isCancelled) {
        throw new BadRequestException('Request already cancelled!');
      }

      const role = await this.accountService.getRoleOfAccount(accountId);
      const requestCancelled = await this.repository.cancelRoomBookingById(
        accountId,
        id,
        reason,
        role.role_name,
        queryRunner
      );

      const request = await this.repository.getRequest(id);

      await this.notificationService.sendCancelRequestNotification(
        dayjs(request.checkinDate).format('DD-MM-YYYY'),
        request.checkinSlotName,
        request.checkoutSlotName,
        request.roomName,
        reason,
        request.requestedBy,
        queryRunner
      );

      return requestCancelled;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async cancelRoomBookingById(accountId: string, id: string, reason: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const request = await this.cancelRequest(
        accountId,
        id,
        reason,
        queryRunner
      );

      await queryRunner.commitTransaction();
      return request;
    } catch (e) {
      this.logger.error(e.message);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    }
  }

  async getAllBookingRoomsRequestsByFilter(
    accountId: string,
    filters: GetAllBookingRequestsFilter
  ) {
    try {
      const roleName = await this.accountService.getAccountRoleById(accountId);
      if (roleName === 'System Admin' || roleName === 'Librarian') {
        return await this.repository.findBookingRoomRequestsByFilter(filters);
      }
      return await this.repository.findBookingRequestsByFilterAndRequestedBy(
        filters,
        accountId
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getCurrentBookingCheckoutInformation(accountId: string) {
    try {
      const requestInfo = await this.repository.findCurrentCheckoutInformation(
        accountId
      );
      console.log(requestInfo);
      if (requestInfo) {
        const listDevice = await this.bookingRoomDeviceService.findByRequestId(
          requestInfo.id
        );
        return {
          ...requestInfo,
          listDevice: listDevice,
        };
      } else {
        throw new BadRequestException('Not found request with provided id');
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async checkOutBookingRoom(bookingRequestId: string, accountId: string) {
    try {
      return await this.repository.checkoutBookingRoom(
        bookingRequestId,
        accountId
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getAllBookingRoomHistory(
    accountId: string,
    filters: GetAllBookingRequestsFilter
  ) {
    return await this.repository.findBookingRoomHistory(accountId, filters);
  }

  async getCurrentBookingCheckin(accountId: string) {
    return await this.repository.findCurrentCheckinInformation(accountId);
  }

  async attemptCheckin(
    accountId: string,
    bookingRequestId: string,
    checkinSignature: { signature: string }
  ) {
    try {
      await this.repository.attemptCheckinBookingRoom(
        accountId,
        bookingRequestId,
        checkinSignature.signature
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async attemptCheckout(
    accountId: string,
    bookingRequestId: string,
    checkinSignature: { signature: string }
  ) {
    try {
      await this.repository.attemptCheckoutBookingRoom(
        accountId,
        bookingRequestId,
        checkinSignature.signature
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async acceptCheckinById(accountId: string, id: string) {
    try {
      console.error('assss');
      await this.repository.acceptCheckinById(accountId, id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async rejectCheckinById(accountId: string, id: string, reason: string) {
    try {
      await this.repository.rejectCheckinById(accountId, id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async acceptCheckoutById(accountId: string, id: string) {
    try {
      await this.repository.acceptCheckoutById(accountId, id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async rejectCheckoutById(accountId: string, id: string, reason: string) {
    try {
      await this.repository.rejectCheckoutById(accountId, id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
