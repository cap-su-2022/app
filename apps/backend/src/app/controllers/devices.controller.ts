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
  UseInterceptors,
  UsePipes
} from "@nestjs/common";
import { DevicesService } from "../services";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddDeviceRequest, UpdateDeviceRequest } from "@app/models";
import { DevicesResponsePayload } from "../payload/response/devices.payload";
import { DevicesRequestPayload } from "../payload/request/devices.payload";
import { DevicesValidation } from "../pipes/validation/devices.validation";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enum/roles.enum";
import { Devices } from "../models";

@Controller("/v1/devices")
@ApiBearerAuth()
@ApiTags("Devices")
@UseInterceptors(new PathLoggerInterceptor(DevicesController.name))
export class DevicesController {

  constructor(private readonly service: DevicesService) {
  }

  @ApiOperation({
    summary: "Create a new device",
    description: "Create new device with the provided payload"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Successfully created a new device"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Request payload for device is not validated"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Access token is invalidated"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  @Post("add")
  @HttpCode(HttpStatus.OK)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  createNewDevice(@Body() room: AddDeviceRequest) {
    return this.service.add(room);
  }

  @Get("find/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: "Retrieving device by id",
    description: "Retrieving device by id"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieving device by id"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error while retrieving device by id"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid access token"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  getDeviceById(@Param() id: string) {
    return this.service.findById(id);
  }

  @Post()
  @UsePipes(new DevicesValidation())
  @HttpCode(HttpStatus.OK)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: "Retrieving a list of devices",
    description: "Retrieving a list of devices with provided pagination payload"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieving a list of devices"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error while retrieving a list of devices"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid access token"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  getDevices(@Body() request: DevicesRequestPayload) {
    return this.service.getAll(request);
  }

  @Get("disabled")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: "Retrieving a list of disabled devices",
    description: "Retrieving a list of disabled devices"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieving a list of disabled devices"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error while retrieving a list of disabled devices"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid access token"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  getDisableDevices(): Promise<Devices[]> {
    return this.service.getDisabledDevices();
  }

  @Get("deleted")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: "Retrieving a list of deleted devices",
    description: "Retrieving a list of deleted devices"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieving a list of deleted devices"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error while retrieving a list of deleted devices"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid access token"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  getDeletedDevices(): Promise<Devices[]> {
    return this.service.getDeletedDevices();
  }

  @Put("restore-deleted/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: "Restore the deleted device by id",
    description: "Restore the deleted device by provided id"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully restored the deleted device"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error while restoring the deleted device"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid access token"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  restoreDeletedDeviceById(@Param() payload: { id: string }) {
    return this.service.handleRestoreDeviceById(payload.id);
  }

  @Put("restore-disabled/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: "Restore the disabled device by id",
    description: "Restore the disabled device by provided id"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully restored the disabled device"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error while restoring the disabled device"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid access token"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  restoreDisabledDeviceById(@Param() payload: { id: string }) {
    return this.service.handleRestoreDisabledDeviceById(payload.id);
  }

  @Put("update/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: "Update the device by id",
    description: "Update the device by provided id"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully updated the device"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error while updating the device"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid access token"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  updateDeviceById(@Param() id: string, @Body() body: UpdateDeviceRequest) {
    return this.service.updateById(body, id);
  }

  @Put("disable/:id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: "Removing the device by id",
    description: "Removing the device by provided id"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully removed the device"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error while removing the device"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid access token"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  disableDeviceById(@Param() payload: { id: string }) {
    return this.service.disableById(payload.id);
  }

  @Delete(":id")
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: "Removing the device by id",
    description: "Removing the device by provided id"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully removed the device"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error while removing the device"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid access token"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  deleteDeviceById(@Param() payload: { id: string }) {
    return this.service.deleteById(payload.id);
  }
}
