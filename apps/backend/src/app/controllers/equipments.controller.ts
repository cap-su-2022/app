import {Controller, Get} from "@nestjs/common";
import {EquipmentsService} from "../services/equipments.service";
import {ApiOperation} from "@nestjs/swagger";
import {Equipments} from "../models/equipments.entity";

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
