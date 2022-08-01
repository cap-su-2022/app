import {Controller, Get, HttpStatus} from '@nestjs/common';
import {NotificationService, NotificationTypeService} from '../services';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('/v1/notification-types')
@ApiBearerAuth()
@ApiTags('Notifcation Types')
export class NotificationTypeController {
  constructor(private readonly service: NotificationTypeService) {
  }

  @Get()
  @ApiOperation({
    summary: 'Get all notification types',
    description: 'Get all notification types',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully got all notification types',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request params is not validated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access token is invalidated',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient privileges',
  })
  getAllNotificationTypes() {
    return;
  }
}
