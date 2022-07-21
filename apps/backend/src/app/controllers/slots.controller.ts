import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Optional, Param, Post, Query} from '@nestjs/common';
import { SlotService } from '../services/slot.service';
import { PaginationParams } from './pagination.model';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';
import {Slot} from "../models/slot.entity";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../decorators/keycloak-user.decorator';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { MasterDataAddRequestPayload } from '../payload/request/master-data-add.request.payload';

@Controller('/v1/slots')
export class SlotController {
  constructor(private readonly service: SlotService) {}

  @Get()
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getAllSlotsByPagination(@Optional() @Query() params?: PaginationParams) {
    return this.service.getAllByPagination(params);
  }

  @Get('name')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  getRoomNames() {
    return this.service.getSlotNames();
  }

  @Get(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getSlotById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post()
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Add slot',
    description: 'Add slot',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully added slot type',
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
  addNewSlot(
    @User() user: KeycloakUserInstance,
    @Body() payload: MasterDataAddRequestPayload
  ) {
    return this.service.addNewSlot(user.account_id, payload);
  }

  @Delete(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted slots',
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
    summary: 'Deleted slots',
    description: 'Deleted slots',
  })
  deleteSlotById(
    @Param('id') id: string,
    @User() user: KeycloakUserInstance
  ) {
    return this.service.deleteSlotById(user.account_id, id);
  }
}
