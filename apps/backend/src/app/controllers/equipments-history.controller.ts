import {Controller, Get} from "@nestjs/common";
import {EquipmentsHistoryService} from "../services/equipments-history.service";
import {EquipmentsHistory} from "../models/equipments.hist.entity";

@Controller('/v1/equipments-history')
export class EquipmentsHistoryController {

  constructor(private readonly service: EquipmentsHistoryService) {
  }

  @Get()
  getAll(): Promise<EquipmentsHistory[]> {
    return this.service.getAllByPagination();
  }
}
