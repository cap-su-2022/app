import { Controller, Get } from '@nestjs/common';
import { NotificationService, NotificationTypeService } from '../services';

@Controller('/v1/notification-types')
export class NotificationTypeController {
  constructor(private readonly service: NotificationTypeService) {}

  @Get()
  getAllNotificationTypes() {
    return;
  }
}
