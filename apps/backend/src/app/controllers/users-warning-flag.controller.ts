import {Controller, Get} from "@nestjs/common";
import {UsersWarningFlagService} from "../services/users-warning-flag.service";
import {UsersWarningFlag} from "../models/users-warning-flag.entity";

@Controller('v1/users-warning-flag')
export class UsersWarningFlagController {

  constructor(private readonly service: UsersWarningFlagService) {
  }

  @Get()
  getAll(): Promise<UsersWarningFlag[]> {
    return this.service.getAllByPagination();
  }


}
