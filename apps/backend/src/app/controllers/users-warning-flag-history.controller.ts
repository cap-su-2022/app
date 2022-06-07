import { Controller, Get, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersWarningFlagHistoryService } from "../services/users-warning-flag-hist.service";
import { UsersWarningFlagHistory } from "../models/users-warning-flag.hist.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../guards/auth.guard";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";

@Controller("v1/users-warning-flag-history")
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
  @UseGuards(AuthGuard)
  getAll(): Promise<UsersWarningFlagHistory[]> {
    return this.service.getAllByPagination();
  }

}
