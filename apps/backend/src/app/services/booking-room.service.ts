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

@Injectable()
export class BookingRoomService {
  private readonly logger = new Logger(BookingRoomService.name);

  constructor(
    private readonly roomService: RoomsService,
    private readonly roomTypeService: RoomTypeService,
    private readonly deviceService: DevicesService,
    private readonly roomWishlistService: RoomWishlistService,
    private readonly repository: BookingRoomRepository,
    private readonly accountService: AccountsService,
    private readonly slotService: SlotService,
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

  async cancelRoomBookingById(accountId: string, id: string): Promise<void> {
    try {
      const isExisted = await this.repository.existsById(id);
      if (isExisted) {
        await this.repository.cancelRoomBookingById(accountId, id);
      } else {
        throw new BadRequestException('Not found with the provided id');
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getBookingRoomById(id: string) {
    try {
      return await this.repository.findById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async addNewRequest(
    payload: BookingRequestAddRequestPayload,
    userId: string
  ): Promise<BookingRequest> {
    try {
      const role = await this.accountService.getRoleOfAccount(userId);
      const slotIn = await this.slotService.getNumOfSlot(payload.checkinSlot);
      const slotOut = await this.slotService.getNumOfSlot(payload.checkoutSlot);
      const listRequestPeningInDay =
        await this.repository.getBookingPendingAndBookedByDay(
          payload.checkinDate
        );

      let status = 'PENDING';
      status = 'BOOKED';
      if (listRequestPeningInDay.length > 0) {
        for (let i = 0; i < listRequestPeningInDay.length; i++) {
          if (listRequestPeningInDay[i].status === 'PENDING') {
            if (
              role.role_name === 'Librarian' ||
              role.role_name === 'System Admin'
            ) {
              for (
                let j = listRequestPeningInDay[i].slotIn;
                j <= listRequestPeningInDay[i].slotOut;
                j++
              ) {
                console.log('Slot of request pending', j);
                if (j >= slotIn.slotNum && j <= slotOut.slotNum) {
                  // j is slot of request pending
                  this.cancelRoomBookingById(
                    userId,
                    listRequestPeningInDay[i].id
                  );
                  console.log('CANCEL: ', listRequestPeningInDay[i].id);
                  break;
                }
              }
            }
          } else if (listRequestPeningInDay[i].status === 'BOOKED') {
            throw new BadRequestException(
              'Already have request booked in this slot, try another slot'
            );
          }
        }
      }

      const request = await this.repository.createNewRequest(
        payload,
        userId,
        status
      );

      // await this.histService.createNew(request);
      return request;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        e.message || 'Error while creating a new device'
      );
    }
  }

  async acceptById(accountId: string, id: string) {
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

    try {
      const requestAccepted = await this.repository.acceptById(accountId, id);
      console.log(requestAccepted);
      // await this.histService.createNew(requestAccepted);
      return requestAccepted;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'Error occurred while accept request'
      );
    }
  }

  async rejectById(accountId: string, id: string) {
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

    try {
      const requestAccepted = await this.repository.rejectById(accountId, id);
      console.log(requestAccepted);
      // await this.histService.createNew(requestAccepted);
      return requestAccepted;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'Error occurred while reject request'
      );
    }
  }
}
