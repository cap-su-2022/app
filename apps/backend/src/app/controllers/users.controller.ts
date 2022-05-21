import {Controller, Get} from "@nestjs/common";
import {UsersService} from "../services/users.service";
import {Users} from "../models/users.entity";
import {ApiBearerAuth, ApiOperation} from "@nestjs/swagger";

@Controller("v1/users")
@ApiBearerAuth()
export class UsersController {

  constructor(private readonly service: UsersService) {
  }

  @Get()
  getAll(): Promise<Users[]> {
    return this.service.getAllByPagination();
  }

  @ApiOperation({
    description: 'Sync users from Keycloak to current DB'
  })
  @Get('syncKeycloak')
  syncUsersFromKeycloak() {
    return this.service.syncUsersFromKeycloak();
  }
}
