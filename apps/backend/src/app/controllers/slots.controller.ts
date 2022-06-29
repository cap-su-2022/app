import { Controller, Get, Param, Query } from '@nestjs/common';
import { SlotService } from '../services/slot.service';
import { PaginationParams } from './pagination.model';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';

@Controller('/v1/slots')
export class SlotController {
  constructor(private readonly service: SlotService) {}

  @Get()
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getAllSlotsByPagination(@Query() params: PaginationParams) {
    return this.service.getAllByPagination(params);
  }

  @Get(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getSlotById(@Param('id') id: string) {
    return this.service.getById(id);
  }
}
