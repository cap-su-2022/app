import { forwardRef, Module } from '@nestjs/common';
import { KeycloakService } from '../services';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { AccountNotificationRepository } from '../repositories/account-notification.repository';
import { AccountNotificationService } from '../services/account-notification.service';
import { AccountNotificationController } from '../controllers/account-notification.controller';
import { AccountsModule } from './accounts.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    forwardRef(() => AccountsModule),
    TypeOrmExModule.forCustomRepository([AccountNotificationRepository]),
  ],
  controllers: [AccountNotificationController],
  providers: [AccountNotificationService, KeycloakService],
  exports: [AccountNotificationService],
})
export class AccountNotificationModule {}
