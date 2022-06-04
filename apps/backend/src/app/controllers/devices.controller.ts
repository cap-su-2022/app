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
import {DevicesService} from "../services/devices.service";
import {ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {AuthGuard} from "../guards/auth.guard";
import {AddDeviceRequest} from "../../../../../libs/models/src/lib/request/add-equipment-request.dto";
import {DevicesResponsePayload} from "../payload/response/devices.payload";
import {DevicesRequestPayload} from "../payload/request/devices.payload";
import {UpdateDeviceRequest} from '@app/models';
import {DevicesValidation} from "../pipes/validation/devices.validation";

@Controller('v1/devices')
@ApiBearerAuth()
export class DevicesController {

  constructor(private readonly service: DevicesService) {
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
    description: 'Request payload for library room is not validated'
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
  @HttpCode(HttpStatus.OK)
  addRoom(@Body() room: AddDeviceRequest) {
    return this.service.add(room);
  }

  @Get("find/:id")
  getDevicesById(@Param() id: string) {
    return this.service.findById(id);
  }

  @Post()
  @UsePipes(new DevicesValidation())
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getDevices(@Body() request: DevicesRequestPayload): Promise<DevicesResponsePayload> {
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
