import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { BookingRoomService } from "../services/booking-room.service";
import { BookingRoomResponseDTO } from "../dto/booking-room.response.dto";
import { WishlistBookingRoomResponseDTO } from "../dto/wishlist-booking-room.response.dto";
import { User } from "../decorators/keycloak-user.decorator";
import { KeycloakUserInfoDTO } from "../dto/keycloak-user-info.dto";
import { WishlistBookingRoomRequestDTO } from "../dto/wishlist-booking-room.request.dto";
import { AuthGuard } from "../guards/auth.guard";
import { ApiTags } from "@nestjs/swagger";

@Controller("/v1/booking-room")
@ApiTags("Booking Room")
export class BookingRoomController {

  constructor(private readonly service: BookingRoomService) {
  }

  @Get()
  getBookingRooms(@Query("roomName") roomName: string): Promise<BookingRoomResponseDTO[]> {
    return this.service.getBookingRooms(roomName);
  }

  @UseGuards(AuthGuard)
  @Get('wishlist')
  getWishlistBookingRooms(@User() user: KeycloakUserInfoDTO,
                          @Query("roomName") roomName: string): Promise<WishlistBookingRoomResponseDTO[]> {
    return this.service.getWishlistBookingRooms(roomName, user);
  }

  @UseGuards(AuthGuard)
  @Post("add-to-wishlist")
  addToBookingRoomWishlist(@User() user: KeycloakUserInfoDTO,
                           @Body() bookingRoomWishlist: WishlistBookingRoomRequestDTO): Promise<any> {
    return this.service.addToBookingRoomWishlist(user, bookingRoomWishlist);
  }
}
