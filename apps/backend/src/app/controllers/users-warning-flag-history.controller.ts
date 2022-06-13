import { Controller, Get, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersWarningFlagHistoryService } from "../services";
import { UsersWarningFlagHistory } from "../models";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enum/roles.enum";

@Controller("/v1/users-warning-flag-history")
@ApiBearerAuth()
@UseInterceptors(new PathLoggerInterceptor(UsersWarningFlagHistoryController.name))
@ApiTags("Users Warning Flag History")
export class UsersWarningFlagHistoryController {

  constructor(private readonly service: UsersWarningFlagHistoryService) {
  }

  @ApiOperation({
    description: "History of warning users flag"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request payload for room booking is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Invalid role',
  })

  @Get()
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getAll(): Promise<UsersWarningFlagHistory[]> {
    return this.service.getAllByPagination();
  }

}
