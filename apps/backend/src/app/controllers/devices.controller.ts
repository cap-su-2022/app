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
import { DevicesService } from "../services/devices.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddDeviceRequest, UpdateDeviceRequest } from "@app/models";
import { DevicesResponsePayload } from "../payload/response/devices.payload";
import { DevicesRequestPayload } from "../payload/request/devices.payload";
import { DevicesValidation } from "../pipes/validation/devices.validation";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enum/roles.enum";

@Controller("v1/devices")
@ApiBearerAuth()
@ApiTags("Devices")
@UseInterceptors(new PathLoggerInterceptor(DevicesController.name))
export class DevicesController {

  constructor(private readonly service: DevicesService) {
  }

  @ApiOperation({
    description: "Get all equipments"
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
    description: "Access token is invalidated"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Invalid role"
  })
  @Post("add")
  @HttpCode(HttpStatus.OK)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  createNewDevice(@Body() room: AddDeviceRequest) {
    return this.service.add(room);
  }

  @Get("find/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getDeviceById(@Param() id: string) {
    return this.service.findById(id);
  }

  @Post()
  @UsePipes(new DevicesValidation())
  @HttpCode(HttpStatus.OK)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getDevices(@Body() request: DevicesRequestPayload): Promise<DevicesResponsePayload> {
    return this.service.getAll(request);
  }

  @Get("disabled")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getDisableRooms() {
    return this.service.getDisabledDevices();
  }

  @Get("deleted")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getDeletedRooms() {
    return this.service.getDeletedDevices();
  }

  @Put("restore-deleted/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  restoreDeletedRoomById(@Param() payload: { id: string }) {
    return this.service.handleRestoreDeviceById(payload.id);
  }

  @Put("restore-disabled/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  restoreDisabledRoomById(@Param() payload: { id: string }) {

    return this.service.handleRestoreDisabledDeviceById(payload.id);
  }

  @Put("update/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  updateRoomById(@Param() id: string, @Body() body: UpdateDeviceRequest) {
    return this.service.updateById(body, id);
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
