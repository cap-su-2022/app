import {Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UsePipes} from "@nestjs/common";
import {AccountsService} from "../services/accounts.service";
import {Accounts} from "../models/account.entity";
import {ApiBearerAuth, ApiOperation} from "@nestjs/swagger";
import {RoomsValidation} from "../pipes/validation/rooms.validation";
import {AuthGuard} from "../guards/auth.guard";
import {UsersValidation} from "../pipes/validation/users.validation";
import {UsersRequestPayload} from "../payload/request/users.payload";

@Controller("v1/users")
@ApiBearerAuth()
export class UsersController {

  constructor(private readonly service: AccountsService) {
  }

  @Post()
  @UsePipes(new UsersValidation())
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getAll(@Body() payload: UsersRequestPayload): Promise<Accounts[]> {
    return this.service.getAllByPagination(payload);
  }

  @ApiOperation({
    description: 'Sync users from Keycloak to current DB'
  })
  @Get('syncKeycloak')
  syncUsersFromKeycloak() {
    return this.service.syncUsersFromKeycloak();
  }
}
