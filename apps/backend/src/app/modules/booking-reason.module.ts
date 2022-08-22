import { BookingRoomModule } from './booking-room.module';
import { forwardRef, Module } from '@nestjs/common';
import ConfigModule from './global/config.module';
import { HttpModule } from '@nestjs/axios';
import { AccountsModule } from './accounts.module';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { BookingReasonController } from '../controllers/booking-reason.controller';
import { BookingReasonService } from '../services/booking-reason.service';
import { BookingReasonHistService } from '../services/booking-reason-hist.service';
import { BookingReasonRepository } from '../repositories/booking-reason.repository';
import { BookingReasonHistRepository } from '../repositories/booking-reason-hist.repository';
import { KeycloakService } from '../services';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    BookingRoomModule,
    forwardRef(() => AccountsModule),
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
