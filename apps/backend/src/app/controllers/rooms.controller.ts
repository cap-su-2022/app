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
  UseGuards,
  UsePipes
} from "@nestjs/common";
import {RoomsService} from "../services/rooms.service";

import {AddRoomRequest, UpdateRoomRequest} from "@app/models";
import {RoomsRequestPayload} from "../payload/request/rooms.payload";
import {RoomsResponsePayload} from "../payload/response/rooms.payload";
import {RoomsValidation} from "../pipes/validation/rooms.validation";
import {AuthGuard} from "../guards/auth.guard";
import {Rooms} from "../models/rooms.entity";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller("/v1/rooms")
@ApiBearerAuth()
@ApiTags('Rooms')

export class RoomsController {

  constructor(private readonly service: RoomsService) {
  }

  @ApiOperation({
    description: 'Create new library room with the provided payload'

  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created a new library room'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request payload for libary room is not validated'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated'
  })
  @ApiResponse({
     status: HttpStatus.FORBIDDEN,
    description: 'Invalid role'
  })
  @Post('add')
  addRoom(@Body() room: AddRoomRequest) {
    return this.service.add(room);
  }

  @Get("find/:id")
  getRoomById(@Param() id: string): Promise<Rooms> {
    return this.service.findById(id);
  }

  @Post()
  @UsePipes(new RoomsValidation())
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getRooms(@Body() request: RoomsRequestPayload): Promise<RoomsResponsePayload> {
    return this.service.getAll(request);
  }

  @Get('disabled')
  @UseGuards(AuthGuard)
  getDisableRooms() {
    return this.service.getDisabledRooms();
  }

  @Get('deleted')
  @UseGuards(AuthGuard)
  getDeletedRooms() {
    return this.service.getDeletedRooms();
  }

  @Put('restore-deleted/:id')
  @UseGuards(AuthGuard)
  restoreDeletedRoomById(@Param() payload: { id: string }) {
    return this.service.handleRestoreDeletedRoomById(payload.id);
  }

  @Put('restore-disabled/:id')
  @UseGuards(AuthGuard)
  restoreDisabledRoomById(@Param() payload: { id: string }) {

    return this.service.handleRestoreDisabledRoomById(payload.id);
  }

  @Put("update/:id")
  updateRoomById(@Param() id: string, @Body() body: UpdateRoomRequest) {
    return this.service.updateById(id, body);
  }

  @Put('disable/:id')
  disableRoomById(@Param() payload: { id: string }) {
    return this.service.disableById(payload.id);
  }

  @Delete(":id")
  deleteRoomById(@Param() payload: { id: string }) {
    return this.service.deleteById(payload.id);
  }
}
