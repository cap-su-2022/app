import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookingReasonService } from '../services/booking-reason.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';
import { User } from '../decorators/keycloak-user.decorator';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { BookingReasonUpdateRequestPayload } from '../payload/request/booking-reason.request.payload';
import { PaginationParams } from './pagination.model';

@Controller('/v1/booking-reasons')
export class BookingReasonController {
  constructor(private readonly service: BookingReasonService) {}

  @Get()
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched booking reason by pagination',
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
    summary: 'Get booking reason type by pagination',
    description: 'Get booking reason type by pagination',
  })
  getBookingReasonTypes(@Query() payload: PaginationParams) {
    return this.service.getBookingReasonTypesWithPagination(
      payload as PaginationParams
    );
  }

  @Get('name')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully got booking reason',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for roles is not validated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiOperation({
    summary: 'Get booking reason',
    description: 'Get booking reason',
  })
  getBookingReasonNames() {
    return this.service.getBookingReasonNames();
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
  getBookingReasonById(@Param('id') id: string) {
    return this.service.getBookingReasonById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Add booking reason',
    description: 'Add booking reason',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully added booking reason',
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
  addNewBookingReason(
    @User() user: KeycloakUserInstance,
    @Body() payload: { name: string; description: string }
  ) {
    return this.service.createNewBookingReason(user.account_id, payload);
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
  updateBookingReasonById(
    @Body() payload: BookingReasonUpdateRequestPayload,
    @Param('id') id: string,
    @User() user: KeycloakUserInstance
  ) {
    return this.service.updateBookingReasonById(user.account_id, payload, id);
  }

  @Delete(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted booking reason',
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
    summary: 'Deleted booking reason',
    description: 'Deleted booking reason',
  })
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

  @Put('restore-deleted/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully restored deleted booking reason by id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Request params for deleted booking reason type is not validated',
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
    summary: 'Successfully restored deleted booking reason type by id',
    description: 'Successfully restored deleted booking reason type by id',
  })
  restoreDeletedReasonById(
    @Param('id') id: string,
    @User() keycloakUser: KeycloakUserInstance
  ) {
    return this.service.restoreDeletedReasonById(keycloakUser.account_id, id);
  }

  @Delete('permanent/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully permanent deleted room type by id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Request params for permanent delete room type is not validated',
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
    summary: 'Permanently delete room type by id',
    description: 'Permanently delete room type by id',
  })
  permanentlyDeleteReasonById(@Param('id') id: string) {
    return this.service.permanentlyDeleteReasonById(id);
  }
}
