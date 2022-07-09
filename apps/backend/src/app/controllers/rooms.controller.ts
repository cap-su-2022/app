import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoomsService } from '../services';

import { AddRoomRequest, UpdateRoomRequest } from '@app/models';
import { RoomsRequestPayload } from '../payload/request/rooms.payload';
import { RoomsResponsePayload } from '../payload/response/rooms.payload';
import { RoomsValidation } from '../pipes/validation/rooms.validation';
import { Rooms } from '../models';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PathLoggerInterceptor } from '../interceptors/path-logger.interceptor';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';
import { AddRoomValidation } from '../pipes/validation/add-room.validation';
import { User } from '../decorators/keycloak-user.decorator';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { Max, Min } from 'class-validator';
import { PaginationParams } from './pagination.model';
import { RoomsPaginationParams } from './rooms-pagination.model';

@Controller('/v1/rooms')
@ApiBearerAuth()
@ApiTags('Rooms')
@UseInterceptors(new PathLoggerInterceptor(RoomsController.name))
export class RoomsController {
  constructor(private readonly service: RoomsService) {}

  @ApiOperation({
    summary: 'Create a new library room',
    description: 'Create new library room with the provided payload',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created a new library room',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request payload for libary room is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @Post('add')
  @UsePipes(new AddRoomValidation())
  @Roles(Role.APP_MANAGER, Role.APP_ADMIN)
  addRoom(
    @User() user: KeycloakUserInstance,
    @Body() room: AddRoomRequest
  ): Promise<Rooms> {
    return this.service.add(user, room);
  }

  @Get('find/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Retrieving the library room by id',
    description: 'Retrieving the library room by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved the library room',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving the library room',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getRoomById(@Param() payload: { id: string }): Promise<Rooms> {
    return this.service.findById(payload.id);
  }

  @Get()
  @UsePipes(new RoomsValidation())
  @HttpCode(HttpStatus.OK)
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
    description: 'Successfully fetched rooms',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not enough privileges to access this endpoint',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getRooms(@Query() payload: RoomsPaginationParams) {
    return this.service.getAll(payload);
  }

  @Get('disabled')
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
    description: 'Successfully fetched disabled rooms',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getDisableRooms(@Query('search') search = ''): Promise<Rooms[]> {
    return this.service.getDisabledRooms(search);
  }

  @Get('deleted')
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
  getDeletedRooms(@Query('search') search = ''): Promise<Rooms[]> {
    return this.service.getDeletedRooms(search);
  }

  @Get('by-room-type')
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
  getRoomsByRoomType(@Query('type') roomTypeId = ''): Promise<Rooms[]> {
    return this.service.getRoomsByRoomType(roomTypeId);
  }

  @Put('restore-deleted/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Restore the deleted library room by id',
    description: 'Restore the deleted library room by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully restored the deleted library room',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while restoring the deleted the library room',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  restoreDeletedRoomById(@Param() payload: { id: string }) {
    return this.service.handleRestoreDeletedRoomById(payload.id);
  }

  @Put('restore-disabled/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Restore the disabled library room by id',
    description: 'Restore the disabled library room by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully restored the disabled library room',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while restoring the disabled the library room',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  restoreDisabledRoomById(
    @User() user: KeycloakUserInstance,
    @Param() payload: { id: string }
  ) {
    return this.service.handleRestoreDisabledRoomById(user.account_id, payload.id);
  }

  @Put('update/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Update library room by id',
    description: 'Update library room by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated the library room',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while updating the library room',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  updateRoomById(
    @User() user: KeycloakUserInstance,
    @Param() payload: { id: string },
    @Body() body: UpdateRoomRequest
  ) {
    return this.service.updateById(user.account_id, payload.id, body);
  }

  @Put('disable/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Disable library room by id',
    description: 'Disable library room by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully disabled the library room',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while disabling the library room',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  disableRoomById(@User() user: KeycloakUserInstance, @Param('id') id: string) {
    return this.service.disableById(user.account_id, id);
  }

  @Delete(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Remove library room by id',
    description: 'Remove library room by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully removed the library room',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while removing the library room',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  deleteRoomById(
    @User() user: KeycloakUserInstance,
    @Param() payload: { id: string }
  ) {
    return this.service.deleteById(user.account_id, payload.id);
  }
}
