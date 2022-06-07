import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersWarningFlagService } from "../services/users-warning-flag.service";
import { UsersWarningFlag } from "../models/users-warning-flag.entity";
import { AuthGuard } from "../guards/auth.guard";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("v1/users-warning-flag")
@ApiTags("Users Warning Flag")
@ApiBearerAuth()
@UseInterceptors(new PathLoggerInterceptor(UsersWarningFlagController.name))
export class UsersWarningFlagController {


  constructor(private readonly service: UsersWarningFlagService) {
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll(): Promise<UsersWarningFlag[]> {
    return this.service.getAllByPagination();
  }


}
