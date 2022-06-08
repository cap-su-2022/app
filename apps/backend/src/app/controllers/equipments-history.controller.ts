import { Controller, Get, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { EquipmentsHistoryService } from "../services/equipments-history.service";
import { EquipmentsHistory } from "../models/equipments.hist.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enum/roles.enum";

@Controller("/v1/equipments-history")
@ApiBearerAuth()
@UseInterceptors(new PathLoggerInterceptor(EquipmentsHistory.name))
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
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getAll(): Promise<EquipmentsHistory[]> {
    return this.service.getAllByPagination();
  }
}
