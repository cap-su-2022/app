import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KeycloakService } from '../services';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import ConfigModule from './global/config.module';
import { AccountsModule } from './accounts.module';
import { BookingFeedbackService } from '../services/booking-feedback.service';
import { BookingFeedbackController } from '../controllers/booking-room-feedback.controller';
import { BookingFeedbackRepository } from '../repositories/booking-feedback.repository';
import { BookingRoomModule } from './booking-room.module';
import { AccountRepository } from '../repositories';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AccountsModule,
    BookingRoomModule,
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
