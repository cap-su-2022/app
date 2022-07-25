import { Controller, Get } from '@nestjs/common';
import { NotificationService } from '../services';

@Controller('/v1/notifications')
export class NotificationController {

  constructor(private readonly service: NotificationService) {}

  @Get()
  getAllNotifications() {
    return;
  }
}
