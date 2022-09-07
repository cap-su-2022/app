import { NotificationController } from './../controllers/notification.controller';
import { forwardRef, Module } from '@nestjs/common';
import { NotificationService } from '../services';
import { KeycloakService } from '../services';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { AccountsModule } from './accounts.module';
import { NotificationRepository } from '../repositories/notification.repository';
import { AccountNotificationModule } from './account-notification.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AccountNotificationModule,
    forwardRef(() => AccountsModule),

    TypeOrmExModule.forCustomRepository([NotificationRepository]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, KeycloakService],
  exports: [NotificationService],
})
export class NotificationModule {}
