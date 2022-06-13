import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { BookingRoomRepository } from "../repositories";
import { BookingRoomResponseDTO } from "../dto/booking-room.response.dto";
import { WishlistBookingRoomResponseDTO } from "../dto/wishlist-booking-room.response.dto";
import { RoomWishlistService } from "./room-wishlist.service";
import { WishlistBookingRoomRequestDTO } from "../dto/wishlist-booking-room.request.dto";
import { BookingRoomsFilterRequestPayload } from "../payload/request/booking-rooms.request.payload";
import { KeycloakUserInstance } from "../dto/keycloak.user";
import { RemoveWishlistRequest } from "../payload/request/remove-from-booking-room-wishlist.request.payload";

@Injectable()
export class BookingRoomService {

  private readonly logger = new Logger(BookingRoomService.name);

  constructor(private readonly roomService: RoomsService,
              private readonly roomWishlistService: RoomWishlistService,
              private readonly repository: BookingRoomRepository) {
  }


  async getBookingRooms(payload: BookingRoomsFilterRequestPayload): Promise<BookingRoomResponseDTO[]> {
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
            slot: j
          });
        }
      }
      console.log(payload.search);
      console.log(result
        .filter((bookingRoom) => bookingRoom.roomName.includes(payload.search)));
      return result
        .filter((bookingRoom) => bookingRoom.roomName.includes(payload.search));
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Error while getting booking rooms");
    }
  }

  getWishlistBookingRooms(roomName: string, keycloakUser: KeycloakUserInstance):
    Promise<WishlistBookingRoomResponseDTO[]> {
    try {
      return this.roomWishlistService
        .findAllWishlistBookingRoomsByKeycloakUserId(roomName, keycloakUser.sub);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException("An error occurred while adding this room");
    }
  }

  async addToBookingRoomWishlist(user: KeycloakUserInstance, wishlist: WishlistBookingRoomRequestDTO) {
    try {
      return await this.roomWishlistService.addToWishlist(user.sub, wishlist);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message ?? "Error while adding to booking room wish list");
    }
  }

  async removeFromBookingRoomWishlist(user: KeycloakUserInstance, payload: RemoveWishlistRequest) {
    try {
      return await this.roomWishlistService.removeFromWishlist(user.account_id, payload);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message ?? "Error while removing from booking room wishlist");
    }
  }
}
