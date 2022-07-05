import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DeviceType } from '../models/device-type.entity';
import { DeviceTypeService } from '../services/device-type.service';
import { User } from '../decorators/keycloak-user.decorator';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginationParams } from './pagination.model';
import { MasterDataAddRequestPayload } from '../payload/request/master-data-add.request.payload';

@Controller('/v1/device-type')
export class DeviceTypeController {
  constructor(private readonly service: DeviceTypeService) {}

  @Get()
  getAllDeviceTypes(
    @Query() payload: PaginationParams
  ): Promise<Pagination<DeviceType>> {
    return this.service.getAllDeviceTypes(payload as PaginationParams);
  }

  @Get(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched device type by id',
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
    summary: 'Get device type by id',
    description: 'Get device type by id',
  })
  getDeviceTypeById(@Param('id') id: string): Promise<DeviceType> {
    return this.service.getDeviceTypeById(id);
  }

  @Get('name')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully got disabled device types',
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
    summary: 'Get disabled device types',
    description: 'Get disabled device types',
  })
  getDeviceTypeNames() {
    return this.service.getDeviceTypeNames();
  }

  @Post()
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Add room type',
    description: 'Add room type',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully added room type',
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
  addNewDeviceType(
    @User() user: KeycloakUserInstance,
    @Body() payload: MasterDataAddRequestPayload
  ) {
    return this.service.addNewDeviceType(user.account_id, payload);
  }

  @Put(':id')
  updateDeviceTypeById(
    @Param('id') id: string,
    @Body() payload: MasterDataAddRequestPayload,
    @User() user: KeycloakUserInstance
  ) {
    return this.service.updateDeviceTypeById(user.account_id, id, payload);
  }

  @Delete(':id')
  deleteDeviceTypeById(
    @Param('id') id: string,
    @User() user: KeycloakUserInstance
  ) {
    return this.service.deleteDeviceTypeById(user.account_id, id);
  }

  @Delete('permanent/:id')
  permanentlyDeleteDeviceTypeById(@Param('id') id: string) {
    return this.service.permanentlyDeleteDeviceTypeById(id);
  }

  @Get('deleted')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted device types',
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
    summary: 'Get deleted device types',
    description: 'Get deleted device types',
  })
  getDeletedDeviceTypes(@Query('search') search: string) {
    return this.service.getDeletedDeviceTypes(search);
  }

  @Put('restore-deleted/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully restored deleted room by id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for deleted room type is not validated',
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
    summary: 'Successfully restored deleted room type by id',
    description: 'Successfully restored deleted room type by id',
  })
  restoreDeletedRoomTypeById(
    @Param('id') id: string,
    @User() keycloakUser: KeycloakUserInstance
  ) {
    return this.service.restoreDeletedRoomTypeById(keycloakUser.account_id, id);
  }
}
