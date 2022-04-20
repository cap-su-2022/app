import {Controller, Get} from "@nestjs/common";
import {UsersWarningFlagHistoryService} from "../services/users-warning-flag-hist.service";
import {UsersWarningFlag} from "../models/users-warning-flag.entity";
import {EquipmentsService} from "../services/equipments.service";
import {Equipments, EquipmentsHistory} from "../models";
import {EquipmentsHistoryService} from "../services/equipments-history.service";

@Controller('/v1/equipments-history')
export class EquipmentsHistoryController {

  constructor(private readonly service: EquipmentsHistoryService) {
  }

  @Get()
  getAll(): Promise<EquipmentsHistory[]> {
    return this.service.getAllByPagination();
  }
}
