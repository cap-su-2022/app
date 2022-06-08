import { Body, Controller, Get, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { BookingRoomService } from "../services/booking-room.service";
import { BookingRoomResponseDTO } from "../dto/booking-room.response.dto";
import { WishlistBookingRoomResponseDTO } from "../dto/wishlist-booking-room.response.dto";
import { User } from "../decorators/keycloak-user.decorator";
import { KeycloakUserInfoDTO } from "../dto/keycloak-user-info.dto";
import { WishlistBookingRoomRequestDTO } from "../dto/wishlist-booking-room.request.dto";
import { AuthGuard } from "../guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";

@Controller("/v1/booking-room")
@ApiTags("Booking Room")
@UseInterceptors(new PathLoggerInterceptor(BookingRoomController.name))
@ApiBearerAuth()
export class BookingRoomController {

  constructor(private readonly service: BookingRoomService) {
  }

  @Get()
  @UseGuards(AuthGuard)
  getBookingRooms(@Query("search") search: string,
                  @Query("sorting") sorting: string,
                  @Query("slot") slot: number): Promise<BookingRoomResponseDTO[]> {
    return this.service.getBookingRooms({
      sorting: sorting,
      search: search,
      slot: slot
    });
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
