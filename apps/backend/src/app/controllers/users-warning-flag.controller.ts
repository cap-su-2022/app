import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersWarningFlagService } from "../services/users-warning-flag.service";
import { UsersWarningFlag } from "../models/users-warning-flag.entity";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enum/roles.enum";

@Controller("v1/users-warning-flag")
@ApiTags("Users Warning Flag")
@ApiBearerAuth()
@UseInterceptors(new PathLoggerInterceptor(UsersWarningFlagController.name))
export class UsersWarningFlagController {


  constructor(private readonly service: UsersWarningFlagService) {
  }

  @Get()
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getAll(): Promise<UsersWarningFlag[]> {
    return this.service.getAllByPagination();
  }


}
