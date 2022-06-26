import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationParams } from './pagination.model';
import { User } from '../decorators/keycloak-user.decorator';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { RoleService } from '../services/role.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PathLoggerInterceptor } from '../interceptors/path-logger.interceptor';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';

@Controller('/v1/roles')
@ApiBearerAuth()
@ApiTags('Role')
@UseInterceptors(new PathLoggerInterceptor(RoleController.name))
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Get()
  @ApiOperation({
    summary: 'Get roles by pagination',
    description: 'Get roles by pagination',
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched roles by pagination',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for roles is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getRolesByPagination(
    @Query('search', new DefaultValuePipe('')) search: string,
    @Query('dir', new DefaultValuePipe('ASC')) dir: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Qu"limit"mit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return this.service.getRolesByPagination({
      dir,
      page,
      search,
      limit
    } as PaginationParams);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get role by id",
    description: "Get role by id"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Id for roel is not validated"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Access token is invalidated"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully fetched role by id"
  })
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getRoleById(@Param('id') id: string) {
    return this.service.getRoleById(id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update role by id",
    description: "Update role by id"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Request payload for role is not validated"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Access token is invalidated"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully updated role with provided id"
  })
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  updateRoleById(
    @Body() body,
    @User() user: KeycloakUserInstance,
    @Param("id") payload: { id: string; }
  ) {
    return this.service.updateRoleById(user.account_id, payload.id, body);
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Request payload for role is not validated"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Access token is invalidated"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully added role"
  })
  @ApiOperation({
    summary: "Add role",
    description: "Add role"
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  addRole(@Body() body, @User() user: KeycloakUserInstance) {
    return this.service.addRole(body, user.account_id);
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully removed role with provided id"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Id for role is not validated"
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Access token is invalidated"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Insufficient privileges"
  })
  @ApiOperation({
    summary: "Delete role by id",
    description: "Delete role by id"
  })
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  deleteRoleById(
    @User() keycloakUser: KeycloakUserInstance,
    @Param("id") id: string;
  ) {
    return this.service.deleteRoleById(keycloakUser.account_id, id);
  }
}
