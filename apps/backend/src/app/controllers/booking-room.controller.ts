import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { BookingRoomService } from '../services';
import { BookingRoomResponseDTO } from '../dto/booking-room.response.dto';
import { WishlistBookingRoomResponseDTO } from '../dto/wishlist-booking-room.response.dto';
import { KeycloakUser, User } from '../decorators/keycloak-user.decorator';
import { WishlistBookingRoomRequestDTO } from '../dto/wishlist-booking-room.request.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PathLoggerInterceptor } from '../interceptors/path-logger.interceptor';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { GetBookingRoomsPaginationPayload } from '../payload/request/get-booking-rooms-pagination.payload';
import { BookingRequest } from '../models';
import { BookingRequestAddRequestPayload } from '../payload/request/booking-request-add.payload';
import { GetAllBookingRequestsFilter } from '../payload/request/get-all-booking-rooms-filter.payload';
import { CancelRequestPayload } from '../payload/request/booking-request-cancel.payload';

@Controller('/v1/booking-room')
@ApiTags('Booking Room')
@UseInterceptors(new PathLoggerInterceptor(BookingRoomController.name))
@ApiBearerAuth()
export class BookingRoomController {
  constructor(private readonly service: BookingRoomService) {}

  @Get('search')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getAllBookingRoomsPagination(
    @Query('search', new DefaultValuePipe('')) search: string,
    @Query('sort', new DefaultValuePipe('requested_at')) sort: string,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('reasonType', new DefaultValuePipe('')) reasonType: string,
    @Query('checkInAt', new DefaultValuePipe('')) checkInAt: string,
    @Query('checkOutAt', new DefaultValuePipe('')) checkOutAt: string,
    @Query('status', new DefaultValuePipe('')) status: string,
    @Query('dir', new DefaultValuePipe('ASC')) dir: string
  ) {
    return this.service.getAllBookingRoomsPagination({
      checkOutAt: checkOutAt,
      checkInAt: checkInAt,
      search: search,
      dir: dir,
      page: page,
      sort: sort,
      limit: limit,
      reasonType: reasonType,
      status: status,
    } as GetBookingRoomsPaginationPayload);
  }

  @Get('list-booking-by-room-in-week')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  getBookingByRoomInWeek(
    @Query('roomId', new DefaultValuePipe('')) roomId: string,
    @Query('date', new DefaultValuePipe('')) date: string
  ) {
    return this.service.getBookingByRoomInWeek({
      roomId: roomId,
      date: date,
    });
  }

  @Get('list-booking-by-slot')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  getBookingBySlot(@Query('slotId', new DefaultValuePipe('')) slotId: string) {
    return this.service.getRequestBySlotId(slotId);
  }

  @Get('list-booking-by-room')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'One or more payload parameters are invalid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched deleted rooms',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getRequestByRoomId(@Query('roomId') roomId = ''): Promise<BookingRequest[]> {
    return this.service.getRequestByRoomId(roomId);
  }

  @Get('list-booking-by-device')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'One or more payload parameters are invalid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched deleted rooms',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getRequestByDeviceId(
    @Query('deviceId') deviceId = ''
  ): Promise<BookingRequest[]> {
    return this.service.getRequestByDeviceId(deviceId);
  }

  @Get('list-booking-with-same-slot')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  getRequestWithSameSlot(
    @Query('checkinSlotId', new DefaultValuePipe('')) checkinSlotId: string,
    @Query('checkoutSlotId', new DefaultValuePipe('')) checkoutSlotId: string,
    @Query('roomId', new DefaultValuePipe('')) roomId: string,
    @Query('requestId', new DefaultValuePipe('')) requestId: string,
    @Query('date', new DefaultValuePipe('')) date: string
  ) {
    return this.service.getRequestOfRoomWithSameSlot({
      roomId: roomId,
      requestId: requestId,
      date: date,
      checkinSlotId: checkinSlotId,
      checkoutSlotId: checkoutSlotId,
    });
  }

  @Get('list-room-free-at-time')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  getRoomFreeAtTime(
    @Query('checkinSlotId', new DefaultValuePipe('')) checkinSlotId: string,
    @Query('checkoutSlotId', new DefaultValuePipe('')) checkoutSlotId: string,
    @Query('date', new DefaultValuePipe('')) date: string
  ) {
    return this.service.getRoomFreeAtTime({
      date: date,
      checkinSlotId: checkinSlotId,
      checkoutSlotId: checkoutSlotId,
    });
  }

  @Get('get-booked-requests')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  getListRequestBookedInDayAndSlot(
    @Query('checkinSlotId', new DefaultValuePipe('')) checkinSlotId: string,
    @Query('checkoutSlotId', new DefaultValuePipe('')) checkoutSlotId: string,
    @Query('date', new DefaultValuePipe('')) date: string
  ) {
    return this.service.getListRequestBookedInDayAndSlot({
      date: date,
      checkinSlotId: checkinSlotId,
      checkoutSlotId: checkoutSlotId,
    });
  }

  @Get('by-account-id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'One or more payload parameters are invalid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched deleted rooms',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getRequestBookingByAccountId(
    @Query('account-id') accountId = ''
  ): Promise<BookingRequest[]> {
    return this.service.getRequestBookingByAccountId(accountId);
  }

  @Get('devices-use-in-request/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'One or more payload parameters are invalid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched device use in request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getDevicesUseInRequest(
    @Param('id') requestId: string
  ): Promise<BookingRequest[]> {
    return this.service.getDevicesUseInRequest(requestId);
  }

  @Get(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Retrieving booking room detail',
    description: 'Retrieving a booking room detail',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved a list of booking rooms',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving a list of booking rooms',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getBookingRoomById(@Param('id') id: string) {
    return this.service.getBookingRoomById(id);
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
  getCurrentRoomBookingDetail(
    @User() user: KeycloakUserInstance,
    @Param() payload: { id: string }
  ) {
    return this.service.getCurrentRoomBookingDetail(
      user.account_id,
      payload.id
    );
  }

  @Get('count-pending')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'One or more payload parameters are invalid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully get count request booking pending',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getCountRequestBookingPending() {
    return this.service.getCountRequestBookingPending();
  }

  @Get('/statistics')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Retrieving a statistic of booking rooms',
    description: 'Retrieving a statistic of booking rooms',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved a statistic of booking rooms',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving a statistic of booking rooms',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getStatistics() {
    return this.service.getStatistics();
  }

  @Get('/count-request/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  @ApiOperation({
    summary: 'Retrieving a count of booking rooms',
    description: 'Retrieving a count of booking rooms',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved a count of booking rooms',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving a count of booking rooms',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getCountRequestInWeekOfUser(@Param() payload: { id: string }) {
    return this.service.getCountRequestInWeekOfUser(payload.id);
  }

  @Get()
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Retrieving a list of booking rooms',
    description: 'Retrieving a list of booking rooms',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved a list of booking rooms',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving a list of booking rooms',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiParam({
    name: 'roomName',
    description: 'The name of the library room',
    example: 'LB01',
    type: String,
    required: true,
  })
  getBookingRooms(
    @Query('search') search: string,
    @Query('sorting') sorting: string,
    @Query('slot') slot: number
  ): Promise<BookingRoomResponseDTO[]> {
    return this.service.getBookingRooms({
      sorting: sorting,
      search: search,
      slot: slot,
    });
  }

  @Post('new-request')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  @ApiOperation({
    summary: 'Create a new request',
    description: 'Create new request with the provided payload',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created a new request',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request payload for request is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  addNewRequest(
    @User() user: KeycloakUserInstance,
    @Body() request: BookingRequestAddRequestPayload
  ) {
    return this.service.addNewRequest(request, user.account_id);
  }

  @Put('accept/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Accept request by id',
    description: 'Accept request by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully accept the request',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while accept the request',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  acceptRequestById(
    @User() user: KeycloakUserInstance,
    @Param() payload: { id: string }
  ) {
    return this.service.acceptById(user.account_id, payload.id);
  }

  @Put('reject/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Reject request by id',
    description: 'Reject request by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully reject the request',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while reject the request',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  rejectRequestById(
    @User() user: KeycloakUserInstance,
    @Param() payload: { id: string }
  ) {
    return this.service.rejectById(user.account_id, payload.id);
  }

  @Put('cancel/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  cancelRoomBookingById(
    @Param('id') id: string,
    @Body() payload: CancelRequestPayload,
    @User() user: KeycloakUserInstance
  ) {
    return this.service.cancelRoomBookingById(user.account_id, id, payload.reason);
  }

  @Get('accounts-name')
  getUsernameList() {
    return this.service.getUsernameList();
  }

  // @Get('rooms-name')
  // getRoomsName() {
  //   return this.service.getRoomNames();
  // }

  // @Get('devices')
  // @Roles(Role.APP_LIBRARIAN, Role.APP_ADMIN, Role.APP_MANAGER, Role.APP_STAFF)
  // getBookingRoomDevices(
  //   @Query('name') name: string,
  //   @Query('type') type: string,
  //   @Query('sort') sort: string
  // ) {
  //   return this.service.getBookingRoomDevices(name, type, sort);
  // }

  @Get('wishlist')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Retrieving a list of booking rooms in wishlist',
    description: 'Retrieving a list of booking rooms in wishlist',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved a list of booking rooms',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving a list of booking rooms',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiParam({
    name: 'roomName',
    description: 'The name of the library room',
    example: 'LB01',
    type: String,
    required: true,
  })
  getWishlistBookingRooms(
    @User() user: KeycloakUserInstance,
    @Query('roomName') roomName: string,
    @Query('from') slotFrom: number,
    @Query('to') slotTo: number
  ): Promise<WishlistBookingRoomResponseDTO[]> {
    return this.service.getWishlistBookingRooms(
      roomName,
      slotFrom,
      slotTo,
      user
    );
  }

  @Post('add-to-wishlist')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  @ApiOperation({
    summary: 'Add booking room to wishlist',
    description: 'Add requested booking room to wishlist',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully added the booking room to the wishlist',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while adding the booking room to the wishlist',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  addToBookingRoomWishlist(
    @User() user: KeycloakUserInstance,
    @Body() bookingRoomWishlist: WishlistBookingRoomRequestDTO
  ): Promise<any> {
    return this.service.addToBookingRoomWishlist(user, bookingRoomWishlist);
  }

  @Delete('remove-from-wishlist')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  removeFromBookingRoomWishlist(
    @User() user: KeycloakUserInstance,
    @Query('roomId') roomId: string,
    @Query('slot') slot: number
  ) {
    return this.service.removeFromBookingRoomWishlist(user, {
      roomId: roomId,
      slot: slot,
    });
  }

  @Get('filter')
  getAllBookingRoomRequestsByFilter(
    @Query() filters: GetAllBookingRequestsFilter
  ) {
    return this.service.getAllBookingRoomsRequestsByFilter(filters);
  }

  @Get('check-out')
  getCurrenBookingCheckoutInformation(@User() user: KeycloakUserInstance) {
    return this.service.getCurrentBookingCheckoutInformation(user.account_id);
  }

  @Post('check-out/:id')
  checkoutBookingRoom(
    @Param('id') bookingRoomId: string,
    @User() keycloakUser: KeycloakUserInstance
  ) {
    return this.service.checkOutBookingRoom(
      bookingRoomId,
      keycloakUser.account_id
    );
  }

  @Get('history')
  getAllBookingRoomHistory(
    @User() keycloakUser: KeycloakUserInstance,
    @Query() filters: GetAllBookingRequestsFilter
  ) {
    return this.service.getAllBookingRoomHistory(
      keycloakUser.account_id,
      filters
    );
  }
}
