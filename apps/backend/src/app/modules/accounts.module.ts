import { forwardRef, Module } from '@nestjs/common';
import { AccountsController } from '../controllers';
import { AccountsService } from '../services';
import { AccountRepository } from '../repositories';
import { KeycloakService } from '../services';
import { HttpModule } from '@nestjs/axios';
import { CloudinaryService } from '../services';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { AccountHistService } from '../services/account-hist.service';
import { AccountHistRepository } from '../repositories';
import { BookingRoomModule } from './booking-room.module';
import { RolesModule } from './roles.module';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => BookingRoomModule),
    forwardRef(() => RolesModule),

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
