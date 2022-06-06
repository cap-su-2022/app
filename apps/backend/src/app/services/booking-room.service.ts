import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { BookingRoomRepository } from "../repositories/booking-room.repository";
import { BookingRoomResponseDTO } from "../dto/booking-room.response.dto";
import { KeycloakUserInfoDTO } from "../dto/keycloak-user-info.dto";
import { WishlistBookingRoomResponseDTO } from "../dto/wishlist-booking-room.response.dto";
import { RoomWishlistService } from "./room-wishlist.service";
import { WishlistBookingRoomRequestDTO } from "../dto/wishlist-booking-room.request.dto";

@Injectable()
export class BookingRoomService {

  private readonly logger = new Logger(BookingRoomService.name);

  constructor(private readonly roomService: RoomsService,
              private readonly roomWishlistService: RoomWishlistService,
              private readonly repository: BookingRoomRepository) {
  }


  async getBookingRooms(roomName: string): Promise<BookingRoomResponseDTO[]> {
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
      return result;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Error while getting booking rooms");
    }
  }

  getWishlistBookingRooms(roomName: string, keycloakUser: KeycloakUserInfoDTO):
    Promise<WishlistBookingRoomResponseDTO[]> {
    try {
      return this.roomWishlistService
        .findAllWishlistBookingRoomsByKeycloakUserId(roomName, keycloakUser.sub);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException("An error occurred while adding this room");
    }
  }

  addToBookingRoomWishlist(user: KeycloakUserInfoDTO, wishlist: WishlistBookingRoomRequestDTO) {
    try {
      return this.roomWishlistService.addToWishlist(user.sub, wishlist);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException("An error occurred while adding booking room to wishlist");
    }
  }
}
