import { Module } from '@nestjs/common';
import { AccountsController } from '../controllers';
import { AccountsService } from '../services';
import { AccountRepository } from '../repositories';
import { KeycloakService } from '../services';
import ConfigModule from './global/config.module';
import { HttpModule } from '@nestjs/axios';
import { CloudinaryService } from '../services';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { AccountHistService } from '../services/account-hist.service';
import { AccountHistRepository } from '../repositories/account-hist.repository';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmExModule.forCustomRepository([
      AccountRepository,
      AccountHistRepository,
    ]),
  ],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    KeycloakService,
    CloudinaryService,
    AccountHistService,
  ],
  exports: [AccountsService, AccountHistService],
})
export class AccountsModule {}
