import { BadRequestException, Injectable, Logger, Scope } from '@nestjs/common';
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
import { BookingRequestAddRequestPayload } from '../payload/request/booking-request-add.request.payload';
import { BookingRequestHistService } from './booking-room-hist.service';
import { SlotService } from './slot.service';
import dayjs = require('dayjs');
import { DataSource } from 'typeorm';
import { BookingRoomDevicesService } from './booking-request-devices.service';
import { GetAllBookingRequestsFilter } from '../payload/request/get-all-booking-rooms-filter.payload';

@Injectable()
export class BookingRoomService {
  private readonly logger = new Logger(BookingRoomService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly roomService: RoomsService,
    private readonly roomTypeService: RoomTypeService,
    private readonly deviceService: DevicesService,
    private readonly roomWishlistService: RoomWishlistService,
    private readonly repository: BookingRoomRepository,
    private readonly accountService: AccountsService,
    private readonly slotService: SlotService,
    private readonly bookingRoomDeviceService: BookingRoomDevicesService,

    private readonly histService: BookingRequestHistService
  ) {}

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

  async getRequestBookingByRoomId(roomId: string): Promise<BookingRequest[]> {
    try {
      return await this.repository.getRequestBookingByRoomId(roomId);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'An error occurred while getting request by room id ' + roomId
      );
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

  getBookingRoomDevices(name: string, type: string, sort: string) {
    return this.deviceService.getBookingRoomDeviceList(name, type, sort);
  }

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

  async getRoomFreeAtTime(payload: {
    date: string;
    checkinSlotId: string;
    checkoutSlotId: string;
  }) {
    try {
      // console.log("DATE:", payload.date);
      // console.log("Checkin Slot:", payload.checkinSlotId);
      // console.log("Checkout Slot:", payload.checkoutSlotId);
      const listRequestBookedInDay =
        await this.repository.getRequestBookedInDay(payload.date);
      if (listRequestBookedInDay.length > 0) {
        const slotIn = await this.slotService.getNumOfSlot(
          payload.checkinSlotId
        );
        const slotOut = await this.slotService.getNumOfSlot(
          payload.checkoutSlotId
        );

        const listRequestBookedInDaySameSlot = listRequestBookedInDay.filter(
          (request) => {
            for (let j = request.slotIn; j <= request.slotOut; j++) {
              if (j >= slotIn.slotNum && j <= slotOut.slotNum) {
                return request;
              }
            }
          }
        );
        console.log('LIST ROOM BOOKED: ', listRequestBookedInDaySameSlot);

        if (listRequestBookedInDaySameSlot.length > 0) {
          const listRoomBookedInDaySameSlot = []
          listRequestBookedInDaySameSlot.map(
            (request) => {
              listRoomBookedInDaySameSlot.push(request.roomId);
            }
          );
          console.log("LIST ROOM ID BOOKED", listRoomBookedInDaySameSlot);
          const result = await this.roomService.filterRoomFreeByRoomBooked(listRoomBookedInDaySameSlot)
          console.log("LIST ROOM AFTER FILTER", result)
          return result
        }
      }
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
      const listRequestPeningAndBookedInDay =
        await this.repository.getBookingPendingAndBookedByDay(
          payload.checkinDate,
          payload.roomId
        );

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

      listRequestSameSlot.map((request) => {
        return this.repository.rejectById(accountId, request.id, queryRunner);
      });
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
      console.log(requestAccepted);
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

  async cancelRoomBookingById(accountId: string, id: string) {
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

      const role = await this.accountService.getRoleOfAccount(accountId);
      const request = await this.repository.cancelRoomBookingById(
        accountId,
        id,
        role.role_name,
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

  getAllBookingRoomsRequestsByFilter(filters: GetAllBookingRequestsFilter) {
    return this.repository.findBookingRoomRequestsByFilter(filters);
  }
}
