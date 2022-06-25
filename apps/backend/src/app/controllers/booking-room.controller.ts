import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseInterceptors} from "@nestjs/common";
import { BookingRoomService } from "../services";
import { BookingRoomResponseDTO } from "../dto/booking-room.response.dto";
import { WishlistBookingRoomResponseDTO } from "../dto/wishlist-booking-room.response.dto";
import {KeycloakUser, User} from "../decorators/keycloak-user.decorator";
import { WishlistBookingRoomRequestDTO } from "../dto/wishlist-booking-room.request.dto";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enum/roles.enum";
import { KeycloakUserInstance } from "../dto/keycloak.user";
import {GetBookingRoomsPaginationPayload} from "../payload/request/get-booking-rooms-pagination.payload";

@Controller("/v1/booking-room")
@ApiTags("Booking Room")
@UseInterceptors(new PathLoggerInterceptor(BookingRoomController.name))
@ApiBearerAuth()
export class BookingRoomController {

  constructor(private readonly service: BookingRoomService) {
  }

  @Get('rooms')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  getChoosingBookingRooms(@Query('filter') filter: string) {
    return this.service.getChoosingBookingRooms(filter);
  }

  @Get('current-booking-list')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  getCurrentRoomBookingListOfCurrentUser(@User() user: KeycloakUserInstance) {
    return this.service.getCurrentRoomBookingList(user.account_id);
  }

  @Get('current-booking/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  getCurrentRoomBookingDetail(@User() user: KeycloakUserInstance, @Param() payload: {id: string}) {
    return this.service.getCurrentRoomBookingDetail(user.account_id, payload.id);
  }

  @Put('current-booking/cancel/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  cancelRoomBookingById(@User() user: KeycloakUserInstance, @Param() payload: {id: string}) {
    return this.service.cancelRoomBookingById(user.account_id, payload.id);
  }


  @Get("accounts-name")
  getUsernameList() {
    return this.service.getUsernameList();
  }

  @Get("rooms-name")
  getRoomsName() {
    return this.service.getRoomsName();
  }

  @Get("search")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getAllBookingRoomsPagination(
    @Query("roomName") roomName = '',
    @Query("sort") sort = 'ASC',
    @Query("limit") limit = 5,
    @Query("page") page = 1,
    @Query("reasonType") reasonType = '',
    @Query("checkInAt") checkInAt = 0,
    @Query("checkOutAt") checkOutAt = 0,
  ) {
    return this.service.getAllBookingRoomsPagination({
      checkOutAt: checkOutAt,
      checkInAt: checkInAt,
      roomName: roomName,
      page: page,
      sort: sort,
      limit: limit,
      reasonType: reasonType,

    } as GetBookingRoomsPaginationPayload);
  }

  @Get()
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: "Retrieving a list of booking rooms",
    description: "Retrieving a list of booking rooms"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved a list of booking rooms"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error while retrieving a list of booking rooms"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid access token"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  @ApiParam({
    name: "roomName",
    description: "The name of the library room",
    example: "LB01",
    type: String,
    required: true
  })
  getBookingRooms(@Query("search") search: string,
                  @Query("sorting") sorting: string,
                  @Query("slot") slot: number): Promise<BookingRoomResponseDTO[]> {
    return this.service.getBookingRooms({
      sorting: sorting,
      search: search,
      slot: slot
    });
  }

  @Roles(Role.APP_LIBRARIAN, Role.APP_ADMIN, Role.APP_MANAGER, Role.APP_STAFF)
  @Get("devices")
  getBookingRoomDevices(
    @Query("name") name: string,
    @Query("type") type: string,
    @Query("sort") sort: string
  ) {
    return this.service.getBookingRoomDevices(name, type, sort);
  }

  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @Get("wishlist")
  @ApiOperation({
    summary: "Retrieving a list of booking rooms in wishlist",
    description: "Retrieving a list of booking rooms in wishlist"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved a list of booking rooms"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error while retrieving a list of booking rooms"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid access token"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  @ApiParam({
    name: "roomName",
    description: "The name of the library room",
    example: "LB01",
    type: String,
    required: true
  })
  getWishlistBookingRooms(@User() user: KeycloakUserInstance,
                          @Query("roomName") roomName: string,
                          @Query("from") slotFrom: number,
                          @Query("to") slotTo: number): Promise<WishlistBookingRoomResponseDTO[]> {
    return this.service.getWishlistBookingRooms(roomName, slotFrom, slotTo, user);
  }

  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  @Post("add-to-wishlist")
  @ApiOperation({
    summary: "Add booking room to wishlist",
    description: "Add requested booking room to wishlist"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully added the booking room to the wishlist"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error while adding the booking room to the wishlist"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid access token"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  addToBookingRoomWishlist(@User() user: KeycloakUserInstance,
                           @Body() bookingRoomWishlist: WishlistBookingRoomRequestDTO): Promise<any> {
    return this.service.addToBookingRoomWishlist(user, bookingRoomWishlist);
  }

  @Delete("remove-from-wishlist")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  removeFromBookingRoomWishlist(@User() user: KeycloakUserInstance,
                                @Query("roomId") roomId: string,
                                @Query("slot") slot: number) {
    return this.service.removeFromBookingRoomWishlist(user, {
      roomId: roomId,
      slot: slot
    });
  }

}


