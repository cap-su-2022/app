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
import { Role } from '../enum/roles.enum';
import { Roles } from '../decorators/role.decorator';
import { MasterDataAddRequestPayload } from '../payload/request/master-data-add.request.payload';
import { RoomsPaginationParams } from './rooms-pagination.model';

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
  getRolesByPagination(@Query() payload: PaginationParams) {
    return this.service.getRolesByPagination(payload);
  }

  @Get('name')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully get role name',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for roles is not validated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiOperation({
    summary: 'Get role name',
    description: 'Get role name',
  })
  getRoleNames() {
    return this.service.getRoleNames();
  }

  @Get(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Get role by id',
    description: 'Get role by id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id for roel is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched role by id',
  })
  getRoleById(@Param('id') id: string) {
    return this.service.getRoleById(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request payload for role is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully added role',
  })
  @ApiOperation({
    summary: 'Add role',
    description: 'Add role',
  })
  addRole(
    @Body() body: MasterDataAddRequestPayload,
    @User() user: KeycloakUserInstance
  ) {
    return this.service.addRole(body, user.account_id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update role by id',
    description: 'Update role by id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request payload for role is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated role with provided id',
  })
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  updateRoleById(
    @Body() body: MasterDataAddRequestPayload,
    @User() user: KeycloakUserInstance,
    @Param('id') id: string
  ) {
    return this.service.updateRoleById(user.account_id, body, id);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully removed role with provided id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id for role is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiOperation({
    summary: 'Delete role by id',
    description: 'Delete role by id',
  })
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  deleteRoleById(
    @User() keycloakUser: KeycloakUserInstance,
    @Param('id') id: string
  ) {
    return this.service.deleteRoleById(keycloakUser.account_id, id);
  }

  @Get('deleted')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Retrieving a list of deleted role',
    description: 'Retrieving a list of deleted role',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieving a list of deleted role',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while retrieving a list of deleted role',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getDeletedRoles(@Query('search') search: string) {
    return this.service.getDeletedRoles(search);
  }

  @Put('restore-deleted/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiOperation({
    summary: 'Restore the deleted role by id',
    description: 'Restore the deleted role by provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully restored the deleted role',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while restoring the deleted the role',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid access token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  restoreDeletedRoleById(
    @Param() payload: { id: string },
    @User() keycloakUser: KeycloakUserInstance
  ) {
    return this.service.handleRestoreDeletedRoleById(
      keycloakUser.account_id,
      payload.id
    );
  }

  @Delete('permanent/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully permanent deleted role by id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for permanent delete role is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  @ApiOperation({
    summary: 'Permanently delete role by id',
    description: 'Permanently delete role by id',
  })
  permanentDeleteRoleById(@Param('id') id: string) {
    return this.service.permanentDeleteRoleById(id);
  }
}
