import { Module } from '@nestjs/common';
import { NotificationController } from '../controllers/notification.controller';
import { NotificationService } from '../services/notification.service';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { NotificationRepository } from '../repositories/notification.repository';
import { NotificationTypeRepository } from '../repositories';
import { NotificationTypeService } from '../services';
import { NotificationTypeController } from '../controllers/notification-type.controller';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([NotificationTypeRepository])],
  exports: [NotificationTypeService],
  providers: [NotificationTypeService],
  controllers: [NotificationTypeController],
})
export class NotificationTypeModule {}
