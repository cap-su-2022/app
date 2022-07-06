import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookingReasonService } from '../services/booking-reason.service';
import { BookingReason } from '../models/booking-reason.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';
import { User } from '../decorators/keycloak-user.decorator';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { BookingReasonUpdateRequestPayload } from '../payload/request/booking-reason.request.payload';

@Controller('/v1/booking-reasons')
export class BookingReasonController {
  constructor(private readonly service: BookingReasonService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched room types by pagination',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for roles is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiOperation({
    summary: 'Get room type by pagination',
    description: 'Get room type by pagination',
  })
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getRoomTypes(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('dir', new DefaultValuePipe('ASC')) dir: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('sort', new DefaultValuePipe('name')) sort: string,
    @Query('search', new DefaultValuePipe('')) search: string
  ) {
    return this.service.getRoomTypesWithPagination({
      limit,
      dir,
      sort,
      search,
      page,
    });
  }

  @Post()
  addNewBookingReason(
    @User() user: KeycloakUserInstance,
    @Body() payload: { name: string; description: string }
  ) {
    return this.service.addNewBookingReason(user.account_id, payload);
  }

  @Get(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched room type by id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for roles is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiOperation({
    summary: 'Get booking-reason by id',
    description: 'Get booking-reason by id',
  })
  getRoomTypeById(@Param('id') id: string) {
    return this.service.getBookingReasonById(id);
  }

  @Put(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated booking-reason by id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for roles is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiOperation({
    summary: 'Update booking-reason by id',
    description: 'Update booking-reason by id',
  })
  updateRoomTypeById(
    @Body() updatePayload: BookingReasonUpdateRequestPayload,
    @Param('id') id: string,
    @User() keycloakUser: KeycloakUserInstance
  ) {
    return this.service.updateBookingReasonById(
      keycloakUser.account_id,
      updatePayload,
      id
    );
  }

  @Delete(':id')
  deleteBookingReasonById(
    @Param('id') id: string,
    @User() user: KeycloakUserInstance
  ) {
    return this.service.deleteBookingReasonById(user.account_id, id);
  }

  @Get('deleted')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted reason',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for roles is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiOperation({
    summary: 'Get deleted reason',
    description: 'Get deleted reason',
  })
  getDeletedBookingReasons(@Query('search') search: string) {
    return this.service.getDeletedReasons(search);
  }
}
