import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DeviceType } from '../models/device-type.entity';
import { DeviceTypeService } from '../services/device-type.service';
import { PaginationParams } from './pagination.model';
import { User } from '../decorators/keycloak-user.decorator';
import { KeycloakUserInstance } from '../dto/keycloak.user';

@Controller('/v1/device-type')
export class DeviceTypeController {
  constructor(private readonly service: DeviceTypeService) {}

  @Get()
  getAllDeviceTypes(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('dir', new DefaultValuePipe('ASC')) dir: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('sort', new DefaultValuePipe('name')) sort: string,
    @Query('search', new DefaultValuePipe('')) search: string
  ): Promise<Pagination<DeviceType>> {
    return this.service.getAllDeviceTypes({
      limit,
      dir,
      page,
      sort,
      search,
    } as PaginationParams);
  }

  @Get(':id')
  getDeviceTypeById(@Param('id') id: string): Promise<DeviceType> {
    return this.service.getDeviceTypeById(id);
  }

  @Put(':id')
  updateDeviceTypeById(
    @Param('id') id: string,
    @Body() payload: { name: string; description: string },
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
}
