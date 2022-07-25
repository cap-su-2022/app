import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { BookingRoomRepository } from '../repositories';
import { BookingRoomResponseDTO } from '../dto/booking-room.response.dto';
import { WishlistBookingRoomResponseDTO } from '../dto/wishlist-booking-room.response.dto';
import { RoomWishlistService } from './room-wishlist.service';
import { WishlistBookingRoomRequestDTO } from '../dto/wishlist-booking-room.request.dto';
import { BookingRoomsFilterRequestPayload } from '../payload/request/booking-rooms.request.payload';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { RemoveWishlistRequest } from '../payload/request/remove-from-booking-room-wishlist.request.payload';
import { DevicesService } from './devices.service';
import { AccountsService } from './accounts.service';
import { ChooseBookingRoomFilterPayload } from '../payload/request/choose-booking-room-filter.payload';
import { GetBookingRoomsPaginationPayload } from '../payload/request/get-booking-rooms-pagination.payload';
import { BookingRequest, Devices } from '../models';
import { RoomTypeService } from './room-type.service';
import { BookingRequestAddRequestPayload } from '../payload/request/booking-request-add.payload';
import { BookingRequestHistService } from './booking-room-hist.service';
import { SlotService } from './slot.service';
import dayjs = require('dayjs');
import { DataSource, QueryRunner } from 'typeorm';
import { BookingRoomDevicesService } from './booking-request-devices.service';
import { GetAllBookingRequestsFilter } from '../payload/request/get-all-booking-rooms-filter.payload';

@Injectable()
export class BookingRoomService {
  private readonly logger = new Logger(BookingRoomService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly repository: BookingRoomRepository,
    private readonly deviceService: DevicesService,
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
  ) {}

  async getStatistics() {
    const result = {
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
    const today = new Date().setHours(0, 0, 0, 0);
    const curr = new Date();
    const firstDayInWeek = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    const lastDayInWeek = firstDayInWeek + 6; // last day is the first day + 6
    const sunday = new Date(curr.setDate(firstDayInWeek)).setHours(0, 0, 0, 0);
    const satuday = new Date(curr.setDate(lastDayInWeek)).setHours(0, 0, 0, 0);
    const firstDayInMonth = new Date(curr.setDate(1)).setHours(0, 0, 0, 0);
    const lastDayInMonth = new Date(
      curr.getFullYear(),
      curr.getMonth() + 1,
      0
    ).setHours(0, 0, 0, 0);
    const allRequest = await this.repository.getAllRequest();
    for (let i = 0; i < allRequest.length; i++) {
      const checkinDate = allRequest[i].checkinDate.setHours(0, 0, 0, 0);
      if (checkinDate === today) {
        result.day.total += 1;
      }
      if (checkinDate >= sunday && checkinDate <= satuday) {
        result.week.total += 1;
      }
      if (checkinDate >= firstDayInMonth && checkinDate <= lastDayInMonth) {
        result.month.total += 1;
      }
      result.totalTime.total += 1;
      if (
        allRequest[i].status === 'BOOKED' ||
        allRequest[i].status === 'CHECKED_ID' ||
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
    console.log('TODAY: ', dayjs(today).format('DD-MM_YYYY'));
    return result;
  }

  getCountRequestInWeekOfUser = async (id: string) => {
    try {
      const result = {
        usedBookingTime: 0,
        totalBookingTime: 3,
      };
      result.usedBookingTime = Number(
        await this.repository.getCountRequestInWeekOfUser(id)
      );
      return result;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while getting booking rooms');
    }
  };

  async getBookingRooms(
    payload: BookingRoomsFilterRequestPayload
  ): Promise<BookingRoomResponseDTO[]> {
    try {
      const rooms = await this.roomService.getAllWithoutPagination();
      const result: BookingRoomResponseDTO[] = [];
      let counter = 1;
      for (let i = 0; i < rooms.length; i++) {
        for (let j = 1; j <= 6; j++) {
          result.push({
            stt: counter++,
            roomId: rooms[i].id,
            roomName: rooms[i].name,
            slot: j,
          });
        }
      }
      console.log(payload.search);
      console.log(
        result.filter((bookingRoom) =>
          bookingRoom.roomName.includes(payload.search)
        )
      );
      return result.filter((bookingRoom) =>
        bookingRoom.roomName.includes(payload.search)
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while getting booking rooms');
    }
  }

  getRequestByRoomId(roomId: string) {
    try {
      return this.repository.getRequestByRoomId(roomId);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        'An error occurred while getting request by room id ' + roomId
      );
    }
  }

  getRequestBySlotId(slotId: string) {
    try {
      return this.repository.getRequestBySlotId(slotId);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  getRequestByDeviceId(deviceId: string) {
    try {
      return this.repository.getRequestByDeviceId(deviceId);
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

  getWishlistBookingRooms(
    roomName: string,
    slotFrom: number,
    slotTo: number,
    keycloakUser: KeycloakUserInstance
  ): Promise<WishlistBookingRoomResponseDTO[]> {
    try {
      return this.roomWishlistService.findAllWishlistBookingRoomsByKeycloakUserId(
        roomName,
        slotFrom,
        slotTo,
        keycloakUser.sub
      );
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('An error occurred while adding this room');
    }
  }

  async addToBookingRoomWishlist(
    user: KeycloakUserInstance,
    wishlist: WishlistBookingRoomRequestDTO
  ) {
    try {
      return await this.roomWishlistService.addToWishlist(user.sub, wishlist);
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

  getUsernameList(): Promise<string[]> {
    return this.accountService.getUsernameList();
  }

  getRoomNames(): Promise<Devices[]> {
    return this.roomService.getRoomNames();
  }

  async getChoosingBookingRooms(filter: string) {
    try {
      const payload = filter
        ? (JSON.parse(filter) as ChooseBookingRoomFilterPayload)
        : ({
            roomName: {
              name: '',
              sort: 'ASC',
            },
            roomType: {
              name: 'e6f085ec',
              sort: 'ASC',
            },
          } as ChooseBookingRoomFilterPayload);
      if (payload.roomType.name.length > 0) {
        const isExisted = await this.roomTypeService.existsById(
          payload.roomType.name
        );
        if (!isExisted) {
          throw new BadRequestException(
            'Room type does not exist with provided id'
          );
        }
      }
      return this.roomService.getRoomsFilterByNameAndType(payload);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  getAllBookingRoomsPagination(payload: GetBookingRoomsPaginationPayload) {
    try {
      return this.repository.findByPaginationPayload(payload);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  getBookingByRoomInWeek(payload: { roomId: string; date: string }) {
    try {
      return this.repository.getBookingByRoomInWeek(payload);
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
        console.log('LIST ROOM BOOKED: ', listRequestBookedInDayAndSlot);
        return listRequestBookedInDayAndSlot;
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

  getCurrentRoomBookingList(accountId: string) {
    try {
      return this.repository.findByCurrentBookingListAndAccountId(accountId);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  getCurrentRoomBookingDetail(accountId: string, id: string) {
    try {
      return this.repository.findByIdAndAccountId(accountId, id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getBookingRoomById(id: string) {
    try {
      const requestInfo = await this.repository.findById(id);
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

  getCountRequestBookingPending() {
    try {
      return this.repository.getCountRequestBookingPending();
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

      let alreadyBookedOtherRoom = '';
      const listRequestBookedInDayOfUser =
        await this.repository.getRequestBookedInDayOfUser(
          payload.checkinDate,
          userId
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
          `You already have bookings for ${alreadyBookedOtherRoom} at same slot!`
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
      if (role.role_name === 'Staff') {
        const countRequestInWeek = Number(
          await this.repository.getCountRequestInWeekOfUser(userId)
        );
        if (countRequestInWeek >= 3) {
          throw new BadRequestException(
            'You have run out of bookings for this week'
          );
        }
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
                  this.repository.rejectById(userId, request.id, queryRunner);
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

      // await this.histService.createNew(request, queryRunner);

      await queryRunner.commitTransaction();

      return request;
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
      const request = await this.repository.findOneOrFail({
        where: {
          id: id,
        },
      });
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
        checkinSlotId: request.checkinSlot,
        checkoutSlotId: request.checkoutSlot,
      });
      if (listRequestSameSlot) {
        listRequestSameSlot.map((request) => {
          return this.repository.rejectById(accountId, request.id, queryRunner);
        });
      }
      const requestAccepted = await this.repository.acceptById(
        accountId,
        id,
        queryRunner
      );
      console.log(requestAccepted);
      // await this.histService.createNew(requestAccepted);
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

  async rejectById(accountId: string, id: string) {
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
      const requestAccepted = await this.repository.rejectById(
        accountId,
        id,
        queryRunner
      );
      await queryRunner.commitTransaction();
      // await this.histService.createNew(requestAccepted);
      return requestAccepted;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();

      throw new BadRequestException(
        e.message ?? 'Error occurred while reject request'
      );
    }
  }

  async cancelRequest(accountId: string, id: string, reason: string, queryRunner: QueryRunner) {
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
      const request = await this.repository.cancelRoomBookingById(
        accountId,
        id,
        reason,
        role.role_name,
        queryRunner
      );

      return request;
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
      const request = await this.cancelRequest(accountId, id, reason, queryRunner);

      await queryRunner.commitTransaction();
      return request;
    } catch (e) {
      this.logger.error(e.message);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    }
  }

  getAllBookingRoomsRequestsByFilter(filters: GetAllBookingRequestsFilter) {
    return this.repository.findBookingRoomRequestsByFilter(filters);
  }

  getCurrentBookingCheckoutInformation(accountId: string) {
    return this.repository.findCurrentCheckoutInformation(accountId);
  }

  checkOutBookingRoom(bookingRequestId: string, accountId: string) {
    return this.repository.checkoutBookingRoom(bookingRequestId, accountId);
  }

  getAllBookingRoomHistory(
    accountId: string,
    filters: GetAllBookingRequestsFilter
  ) {
    return this.repository.findBookingRoomHistory(accountId, filters);
  }
}
