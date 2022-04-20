import {Controller, Get} from "@nestjs/common";
import {UsersWarningFlagHistoryService} from "../services/users-warning-flag-hist.service";
import {UsersWarningFlag} from "../models/users-warning-flag.entity";
import {EquipmentsService} from "../services/equipments.service";
import {Equipments} from "../models";
import {ApiOperation} from "@nestjs/swagger";

@Controller('v1/equipments')
export class EquipmentsController {

  constructor(private readonly service: EquipmentsService) {
  }

  @ApiOperation({
    description: 'Get all equipments'
  })
  @Get()
  getAll(): Promise<Equipments[]> {
    return this.service.getAllByPagination();
  }
}
