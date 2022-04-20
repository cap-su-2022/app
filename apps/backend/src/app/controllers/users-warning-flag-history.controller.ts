import {Controller, Get} from "@nestjs/common";
import {UsersWarningFlag} from "../models/users-warning-flag.entity";
import {UsersWarningFlagHistoryService} from "../services/users-warning-flag-hist.service";
import {UsersWarningFlagHistory} from "../models";

@Controller('v1/users-warning-flag-history')
export class UsersWarningFlagHistoryController {

  constructor(private readonly service: UsersWarningFlagHistoryService) {
  }

  @Get()
  getAll(): Promise<UsersWarningFlagHistory[]> {
    return this.service.getAllByPagination();
  }

}
