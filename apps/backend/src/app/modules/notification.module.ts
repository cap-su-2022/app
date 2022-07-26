import { Module } from '@nestjs/common';
import {  NotificationController } from '../controllers';
import {  NotificationService } from '../services';
import { KeycloakService } from '../services';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { AccountsModule } from './accounts.module';
import { NotificationRepository } from '../repositories/notification.repository';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AccountsModule,
    TypeOrmExModule.forCustomRepository([
      NotificationRepository,
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, KeycloakService],
  exports: [NotificationService],
})
export class NotificationModule {}
