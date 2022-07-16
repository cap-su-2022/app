import {Controller, Get, Optional, Param, Query} from '@nestjs/common';
import { SlotService } from '../services/slot.service';
import { PaginationParams } from './pagination.model';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';
import {Slot} from "../models/slot.entity";

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

}
