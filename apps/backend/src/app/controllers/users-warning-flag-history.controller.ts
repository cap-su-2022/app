import {Controller, Get, HttpStatus} from "@nestjs/common";
import {UsersWarningFlagHistoryService} from "../services/users-warning-flag-hist.service";
import {UsersWarningFlagHistory} from "../models/users-warning-flag.hist.entity";
import {ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('v1/users-warning-flag-history')
@ApiBearerAuth()
export class UsersWarningFlagHistoryController {

  constructor(private readonly service: UsersWarningFlagHistoryService) {
  }

  @ApiOperation({
    description: 'History of warning users flag',
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
  getAll(): Promise<UsersWarningFlagHistory[]> {
    return this.service.getAllByPagination();
  }

}
