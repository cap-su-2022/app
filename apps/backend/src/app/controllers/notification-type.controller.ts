import { Controller, Get } from '@nestjs/common';
import { NotificationService, NotificationTypeService } from '../services';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@Controller('/v1/notification-types')
@ApiBearerAuth()
@ApiTags('Notifcation Types')
export class NotificationTypeController {
  constructor(private readonly service: NotificationTypeService) {}

  @Get()
  getAllNotificationTypes() {
    return;
  }
}
