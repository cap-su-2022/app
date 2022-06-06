import { Controller, Get, HttpStatus, UseGuards } from "@nestjs/common";
import { EquipmentsHistoryService } from "../services/equipments-history.service";
import { EquipmentsHistory } from "../models/equipments.hist.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "../guards/auth.guard";

@Controller("/v1/equipments-history")
@ApiBearerAuth()
export class EquipmentsHistoryController {

  constructor(private readonly service: EquipmentsHistoryService) {
  }

  @ApiOperation({
    description: "Get all equipments history"
  })

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request payload for equipments history not validated'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Invalid role'
  })

  @Get()
  @UseGuards(AuthGuard)
  getAll(): Promise<EquipmentsHistory[]> {
    return this.service.getAllByPagination();
  }
}
