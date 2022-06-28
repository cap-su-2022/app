import { Controller, Get } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';

@Controller('/v1/notification')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Get()
  getAllNotifications() {
    return;
  }
}
