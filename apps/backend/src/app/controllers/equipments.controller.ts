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
import {EquipmentsService} from "../services/equipments.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {AddRoomRequest, UpdateRoomRequest} from "@app/models";
import {Rooms} from "../models/rooms.entity";
import {RoomsValidation} from "../pipes/validation/rooms.validation";
import {AuthGuard} from "../guards/auth.guard";
import {RoomsRequestPayload} from "../payload/request/rooms.payload";
import {RoomsResponsePayload} from "../payload/response/rooms.payload";
import {AddEquipmentRequest} from "../../../../../libs/models/src/lib/request/add-equipment-request.dto";
import {DevicesResponsePayload} from "../payload/response/devices.payload";
import {EquipmentsRequestPayload} from "../payload/request/equipments.payload";
import {UpdateDeviceRequest} from '@app/models';

@Controller('v1/equipments')
export class EquipmentsController {

  constructor(private readonly service: EquipmentsService) {
  }

  @ApiOperation({
    description: 'Get all equipments'
  })
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
  addRoom(@Body() room: AddEquipmentRequest) {
    return this.service.add(room);
  }

  @Get("find/:id")
  getDevicesById(@Param() id: string) {
    return this.service.findById(id);
  }

  @Post()
  @UsePipes(new RoomsValidation())
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getDevices(@Body() request: EquipmentsRequestPayload): Promise<DevicesResponsePayload> {
    return this.service.getAll(request);
  }

  @Get('disabled')
  @UseGuards(AuthGuard)
  getDisableRooms() {
    return this.service.getDisabledDevices();
  }

  @Get('deleted')
  @UseGuards(AuthGuard)
  getDeletedRooms() {
    return this.service.getDeletedDevices();
  }

  @Put('restore-deleted/:id')
  @UseGuards(AuthGuard)
  restoreDeletedRoomById(@Param() payload: { id: string }) {
    return this.service.handleRestoreDeviceById(payload.id);
  }

  @Put('restore-disabled/:id')
  @UseGuards(AuthGuard)
  restoreDisabledRoomById(@Param() payload: { id: string }) {

    return this.service.handleRestoreDisabledDeviceById(payload.id);
  }

  @Put("update/:id")
  updateRoomById(@Param() id: string, @Body() body: UpdateDeviceRequest) {
    return this.service.updateById(body, id);
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
