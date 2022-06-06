import { Controller, Get, UseGuards } from "@nestjs/common";
import { UsersWarningFlagService } from "../services/users-warning-flag.service";
import { UsersWarningFlag } from "../models/users-warning-flag.entity";
import { AuthGuard } from "../guards/auth.guard";

@Controller("v1/users-warning-flag")
export class UsersWarningFlagController {

  constructor(private readonly service: UsersWarningFlagService) {
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll(): Promise<UsersWarningFlag[]> {
    return this.service.getAllByPagination();
  }


}
