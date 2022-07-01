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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoomTypeService } from '../services/room-type.service';
import { RoomTypeUpdateRequestPayload } from '../payload/request/room-type-update.request.payload';
import { RoomTypeAddRequestPayload } from '../payload/request/room-type-add.request.payload';
import { User } from '../decorators/keycloak-user.decorator';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { PathLoggerInterceptor } from '../interceptors/path-logger.interceptor';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';

@Controller('/v1/room-type')
@ApiBearerAuth()
@ApiTags('Room Type')
@UseInterceptors(new PathLoggerInterceptor(RoomTypeService.name))
export class RoomTypeController {
  constructor(private readonly service: RoomTypeService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched room types by pagination',
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
  @ApiOperation({
    summary: 'Get room type by pagination',
    description: 'Get room type by pagination',
  })
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  getRoomTypes(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('dir', new DefaultValuePipe('ASC')) dir: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('sort', new DefaultValuePipe('name')) sort: string,
    @Query('search', new DefaultValuePipe('')) search: string
  ) {
    return this.service.getRoomTypesWithPagination({
      limit,
      dir,
      sort,
      search,
      page,
    });
  }

  @Get('name')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully got disabled room types',
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
  @ApiOperation({
    summary: 'Get disabled room types',
    description: 'Get disabled room types',
  })
  getRoomTypeNames() {
    return this.service.getRoomTypeNames();
  }

  @Get(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched room type by id',
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
  @ApiOperation({
    summary: 'Get room type by id',
    description: 'Get room type by id',
  })
  getRoomTypeById(@Param('id') id: string) {
    return this.service.getRoomTypeById(id);
  }

  @Put(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated room type by id',
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
  @ApiOperation({
    summary: 'Update room type by id',
    description: 'Update room type by id',
  })
  updateRoomTypeById(
    @Body() updatePayload: RoomTypeUpdateRequestPayload,
    @Param('id') id: string,
    @User() keycloakUser: KeycloakUserInstance
  ) {
    return this.service.updateRoomTypeById(
      keycloakUser.account_id,
      updatePayload,
      id
    );
  }

  // @Put('disable/:id')
  // @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Successfully fetched disabled room type by id',
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   description: 'Request params for roles is not validated',
  // })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   description: 'Access token is invalidated',
  // })
  // @ApiResponse({
  //   status: HttpStatus.FORBIDDEN,
  //   description: 'Insufficient privileges',
  // })
  // @ApiOperation({
  //   summary: 'Get disabled room type by id',
  //   description: 'Get disabled room type by id',
  // })
  // disableRoomTypeById(
  //   @Param('id') id: string,
  //   @User() keycloakUser: KeycloakUserInstance
  // ) {
  //   return this.service.disableRoomTypeById(keycloakUser.account_id, id);
  // }

  @Get('disabled')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully got disabled room types',
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
  @ApiOperation({
    summary: 'Get disabled room types',
    description: 'Get disabled room types',
  })
  getDisabledRoomTypes(@Query('search') search: string) {
    return this.service.getDisabledRoomTypes(search);
  }

  @Get('deleted')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted room types',
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
  @ApiOperation({
    summary: 'Get deleted room types',
    description: 'Get deleted room types',
  })
  getDeletedRoomTypes(@Query('search') search: string) {
    return this.service.getDeletedRoomTypes(search);
  }

  @Put('restore-disabled/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully restored disabled room by id',
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
  @ApiOperation({
    summary: 'Restore disabled room type by id',
    description: 'Restore disabled room type by id',
  })
  restoreDisabledRoomTypeById(
    @Param('id') id: string,
    @User() keycloakUser: KeycloakUserInstance
  ) {
    return this.service.restoreDisabledRoomTypeById(
      keycloakUser.account_id,
      id
    );
  }

  @Put('restore-deleted/:id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully restored deleted room by id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for deleted room type is not validated',
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
    summary: 'Successfully restored deleted room type by id',
    description: 'Successfully restored deleted room type by id',
  })
  restoreDeletedRoomTypeById(
    @Param('id') id: string,
    @User() keycloakUser: KeycloakUserInstance
  ) {
    return this.service.restoreDeletedRoomTypeById(keycloakUser.account_id, id);
  }

  @Delete(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted room type by id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params for delete room type is not validated',
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
    summary: 'Delete room type by id',
    description: 'Delete room type by id',
  })
  deleteRoomTypeById(
    @Param('id') id: string,
    @User() keycloakUser: KeycloakUserInstance
  ) {
    return this.service.deleteRoomTypeById(keycloakUser.account_id, id);
  }

  @Post()
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Add room type',
    description: 'Add room type',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully added room type',
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
  addRoomType(
    @User() keycloakUser: KeycloakUserInstance,
    @Body() addRoomType: RoomTypeAddRequestPayload
  ) {
    return this.service.addRoomType(keycloakUser.account_id, addRoomType);
  }
}
