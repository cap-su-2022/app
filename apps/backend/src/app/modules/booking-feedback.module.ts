import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { KeycloakService } from '../services';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { AccountsModule } from './accounts.module';
import { BookingFeedbackService } from '../services/booking-feedback.service';
import { BookingFeedbackController } from '../controllers/booking-room-feedback.controller';
import { BookingFeedbackRepository } from '../repositories';
import { BookingRoomModule } from './booking-room.module';
import { AccountRepository } from '../repositories';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => AccountsModule),
    forwardRef(() => BookingRoomModule),
    TypeOrmExModule.forCustomRepository([
      BookingFeedbackRepository,
      AccountRepository,
    ]),
  ],
  controllers: [BookingFeedbackController],
  providers: [BookingFeedbackService, KeycloakService],
  exports: [BookingFeedbackService],
})
export class BookingFeedbackModule {}
