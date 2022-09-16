import { forwardRef, Module } from '@nestjs/common';
import { KeycloakService } from '../services';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { AccountNotificationRepository } from '../repositories/account-notification.repository';
import { AccountNotificationService } from '../services/account-notification.service';
import { AccountNotificationController } from '../controllers';
import { AccountsModule } from './accounts.module';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => AccountsModule),
    TypeOrmExModule.forCustomRepository([AccountNotificationRepository]),
  ],
  controllers: [AccountNotificationController],
  providers: [AccountNotificationService, KeycloakService],
  exports: [AccountNotificationService],
})
export class AccountNotificationModule {}
