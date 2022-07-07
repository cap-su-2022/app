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
} from '@nestjs/common';
import { DevicesService } from '../services';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddDeviceRequest, UpdateDeviceRequest } from '@app/models';
import { DevicesResponsePayload } from '../payload/response/devices.payload';
import { DevicesRequestPayload } from '../payload/request/devices.payload';
import { DevicesValidation } from '../pipes/validation/devices.validation';
import { PathLoggerInterceptor } from '../interceptors/path-logger.interceptor';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';
import {Devices, Rooms} from '../models';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { User } from '../decorators/keycloak-user.decorator';

@Controller('/v1/devices')
@ApiBearerAuth()
@ApiTags('Devices')
@UseInterceptors(new PathLoggerInterceptor(DevicesController.name))
export class DevicesController {
  constructor(private readonly service: DevicesService) {}

  @ApiOperation({
    summary: 'Create a new device',
    description: 'Create new device with the provided payload',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created a new device',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request payload for device is not validated',
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
  @HttpCode(HttpStatus.OK)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  createNewDevice(
    @User() user: KeycloakUserInstance,
    @Body() device: AddDeviceRequest
  ) {
    return this.service.add(device, user.account_id);
  }

  @Get('find/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Retrieving device by id',
    description: 'Retrieving device by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieving device by id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving device by id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getDeviceById(@Param() payload: { id: string }): Promise<Devices> {
    return this.service.findById(payload.id);
  }

  @Get('by-device-type')
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
  getRoomsByRoomType(@Query('type') deviceTypeId= ''): Promise<Devices[]> {
    return this.service.getDevicesByDeviceType(deviceTypeId);
  }

  @Post()
  @UsePipes(new DevicesValidation())
  @HttpCode(HttpStatus.OK)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Retrieving a list of devices',
    description:
      'Retrieving a list of devices with provided pagination payload',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieving a list of devices',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving a list of devices',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getDevices(@Body() request: DevicesRequestPayload) {
    return this.service.getAll(request);
  }

  @Get('disabled')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Retrieving a list of disabled devices',
    description: 'Retrieving a list of disabled devices',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieving a list of disabled devices',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving a list of disabled devices',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getDisableDevices(): Promise<Devices[]> {
    return this.service.getDisabledDevices();
  }

  @Get('deleted')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Retrieving a list of deleted devices',
    description: 'Retrieving a list of deleted devices',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieving a list of deleted devices',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving a list of deleted devices',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getDeletedDevices(): Promise<Devices[]> {
    return this.service.getDeletedDevices();
  }

  @Put('restore-deleted/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Restore the deleted device by id',
    description: 'Restore the deleted device by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully restored the deleted device',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while restoring the deleted device',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  restoreDeletedDeviceById(@Param() payload: { id: string }) {
    return this.service.handleRestoreDeviceById(payload.id);
  }

  @Put('restore-disabled/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Restore the disabled device by id',
    description: 'Restore the disabled device by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully restored the disabled device',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while restoring the disabled device',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  restoreDisabledDeviceById(@Param() payload: { id: string }) {
    return this.service.handleRestoreDisabledDeviceById(payload.id);
  }

  @Put('update/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Update the device by id',
    description: 'Update the device by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated the device',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while updating the device',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  updateDeviceById(
    @User() user: KeycloakUserInstance,
    @Param() payload: { id: string },
    @Body() body: UpdateDeviceRequest
  ) {
    return this.service.updateById(user.account_id, payload.id, body);
  }

  @Put('disable/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Removing the device by id',
    description: 'Removing the device by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully removed the device',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while removing the device',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  disableDeviceById(@User() user: KeycloakUserInstance, @Param('id') id: string) {
    return this.service.disableById(user.account_id, id);
  }

  @Delete(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Removing the device by id',
    description: 'Removing the device by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully removed the device',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while removing the device',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  deleteDeviceById(
    @User() user: KeycloakUserInstance,
    @Param() payload: { id: string }
  ) {
    return this.service.deleteById(user.account_id, payload.id);
  }
}
