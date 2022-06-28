import { Module } from '@nestjs/common';
import { NotificationController } from '../controllers/notification.controller';

@Module({
  imports: [],
  exports: [],
  providers: [],
  controllers: [NotificationController],
})
export class NotificationModule {}
