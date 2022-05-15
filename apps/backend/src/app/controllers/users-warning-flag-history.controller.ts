import {Controller, Get} from "@nestjs/common";
import {UsersWarningFlagHistoryService} from "../services/users-warning-flag-hist.service";
import {UsersWarningFlagHistory} from "../models/users-warning-flag.hist.entity";

@Controller('v1/users-warning-flag-history')
export class UsersWarningFlagHistoryController {

  constructor(private readonly service: UsersWarningFlagHistoryService) {
  }

  @Get()
  getAll(): Promise<UsersWarningFlagHistory[]> {
    return this.service.getAllByPagination();
  }

}
