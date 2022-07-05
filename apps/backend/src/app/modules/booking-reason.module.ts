import { Module } from '@nestjs/common';
import ConfigModule from './global/config.module';
import { HttpModule } from '@nestjs/axios';
import { AccountsModule } from './accounts.module';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { RolesRepository } from '../repositories/roles.repository';
import { RoleHistRepository } from '../repositories/role-hist.repository';
import { RoleController } from '../controllers/role.controller';
import { RoleService } from '../services/role.service';
import { RoleHistService } from '../services/role-hist.service';
import { BookingReasonController } from '../controllers/booking-reason.controller';
import { BookingReasonService } from '../services/booking-reason.service';
import { BookingReasonHistService } from '../services/booking-reason-hist.service';
import { BookingReason } from '../models/booking-reason.entity';
import { BookingReasonHist } from '../models/booking-reason-hist.entity';
import { BookingReasonRepository } from '../repositories/booking-reason.repository';
import { BookingReasonHistRepository } from '../repositories/booking-reason-hist.repository';
import { KeycloakService } from '../services';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AccountsModule,
    TypeOrmExModule.forCustomRepository([
      BookingReasonRepository,
      BookingReasonHistRepository,
    ]),
  ],
  controllers: [BookingReasonController],
  providers: [BookingReasonService, BookingReasonHistService, KeycloakService],
  exports: [BookingReasonService, BookingReasonHistService],
})
export class BookingReasonModule {}
