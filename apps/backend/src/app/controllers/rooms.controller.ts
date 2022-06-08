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
  UseGuards, UseInterceptors,
  UsePipes
} from "@nestjs/common";
import { RoomsService } from "../services/rooms.service";

import { AddRoomRequest, UpdateRoomRequest } from "@app/models";
import { RoomsRequestPayload } from "../payload/request/rooms.payload";
import { RoomsResponsePayload } from "../payload/response/rooms.payload";
import { RoomsValidation } from "../pipes/validation/rooms.validation";
import { Rooms } from "../models/rooms.entity";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enum/roles.enum";

@Controller("/v1/rooms")
@ApiBearerAuth()
@ApiTags("Rooms")
@UseInterceptors(new PathLoggerInterceptor(RoomsController.name))
export class RoomsController {
  constructor(private readonly service: RoomsService) {
  }

  @ApiOperation({
    description: "Create new library room with the provided payload"
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
    description: 'Invalid role',
  })
  @Post('add')
  @ApiBody({
    type: AddRoomRequest
  })
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  addRoom(@Body() room: AddRoomRequest): Promise<Rooms> {
    return this.service.add(room);
  }

  @Get("find/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getRoomById(@Param() id: string): Promise<Rooms> {
    return this.service.findById(id);
  }

  @Post()
  @UsePipes(new RoomsValidation())
  @HttpCode(HttpStatus.OK)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Access token is invalidated"
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
  getRooms(
    @Body() request: RoomsRequestPayload
  ): Promise<RoomsResponsePayload> {
    return this.service.getAll(request);
  }

  @Get("disabled")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Access token is invalidated"
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
    description: 'Not enough privileges to access this endpoint',
  })
  getDisableRooms(): Promise<Rooms[]> {
    return this.service.getDisabledRooms();
  }

  @Get("deleted")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Access token is invalidated"
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
    description: 'Not enough privileges to access this endpoint',
  })
  getDeletedRooms(): Promise<Rooms[]> {
    return this.service.getDeletedRooms();
  }

  @Put("restore-deleted/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  restoreDeletedRoomById(@Param() payload: { id: string }) {
    return this.service.handleRestoreDeletedRoomById(payload.id);
  }

  @Put("restore-disabled/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  restoreDisabledRoomById(@Param() payload: { id: string }) {
    return this.service.handleRestoreDisabledRoomById(payload.id);
  }

  @Put("update/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  updateRoomById(@Param() payload: { id: string }, @Body() body: UpdateRoomRequest) {
    return this.service.updateById(payload.id, body);
  }

  @Put("disable/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  disableRoomById(@Param() payload: { id: string }) {
    return this.service.disableById(payload.id);
  }

  @Delete(":id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  deleteRoomById(@Param() payload: { id: string }) {
    return this.service.deleteById(payload.id);
  }
}
