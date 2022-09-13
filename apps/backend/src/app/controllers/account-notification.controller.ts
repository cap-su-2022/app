import { KeycloakUserInstance } from './../dto/keycloak.user';
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { User } from '../decorators/keycloak-user.decorator';
import { Notification } from '../models';
import { AccountNotificationService } from '../services/account-notification.service';

@Controller('/v1/account-notifications')
@ApiBearerAuth()
@ApiTags('AccountNotification')
export class AccountNotificationController {

  constructor(private readonly service: AccountNotificationService) {}

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
}
