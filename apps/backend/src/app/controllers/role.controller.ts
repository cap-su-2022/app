import {Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {PaginationParams} from "./pagination.model";
import {User} from "../decorators/keycloak-user.decorator";
import {KeycloakUserInstance} from "../dto/keycloak.user";
import { RoleService } from "../services/role.service";
import {Min, MinLength} from "class-validator";

@Controller('/v1/roles')
export class RoleController {

  constructor(private readonly service: RoleService,) {
  }

  @Get()
  getRolesByPagination(
    @Query('search', new DefaultValuePipe('')) search: string,
    @Query('dir', new DefaultValuePipe('ASC')) dir: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.service.getRolesByPagination({
      dir,  page, search, limit
    } as PaginationParams);
  }

  @Get(':id')
  getRoleById(@Param('id') id: string) {
    return this.service.getRoleById(id);
  }

  @Put(':id')
  updateRoleById(@Body() body,
                 @User() user: KeycloakUserInstance,
                 @Param('id') payload: {id: string}) {
    return this.service.updateRoleById(user.account_id, payload.id, body);
  }

  @Post()
  addRole(
    @Body() body,
    @User() user: KeycloakUserInstance
  ) {
    return this.service.addRole(body, user.account_id);
  }

  @Delete(':id')
  deleteRoleById(
    @Param('id') payload: {id: string}
  ) {
    return this.service.deleteRoleById(payload.id);
  }
}
