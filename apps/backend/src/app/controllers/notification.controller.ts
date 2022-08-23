import { KeycloakUserInstance } from './../dto/keycloak.user';
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { NotificationService } from '../services';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { User } from '../decorators/keycloak-user.decorator';
import { Notification } from '../models';

@Controller('/v1/notifications')
@ApiBearerAuth()
@ApiTags('Notification')
export class NotificationController {

  constructor(private readonly service: NotificationService) {}

  @Get('own-notifications')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully got get your own notifications',
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
    summary: 'Get your own notifications',
    description: 'Get your own notifications',
  })
  getYourOwnNotifications(
    @User() user: KeycloakUserInstance
  ): Promise<Notification[]> {
    return this.service.getYourOwnNotifications(user.account_id);
  }

  @Get(':id')
  @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN, Role.APP_STAFF)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched notification by id',
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
    summary: 'Get notification by id',
    description: 'Get notification by id',
  })
  getDetailNotificationId(@Param('id') id: string, @User() user: KeycloakUserInstance) {
    return this.service.getDetailNotificationId(id, user.account_id);
  }
}
