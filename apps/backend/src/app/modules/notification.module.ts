import { Module } from '@nestjs/common';
import { NotificationController } from '../controllers/notification.controller';
import { NotificationService } from '../services/notification.service';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { NotificationRepository } from '../repositories/notification.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([NotificationRepository])],
  exports: [NotificationService],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
