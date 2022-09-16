import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { SlotRepository } from '../repositories/slot.repository';
import { SlotController } from '../controllers/slots.controller';
import { SlotService } from '../services/slot.service';
import { KeycloakService } from '../services';
import { HttpModule } from '@nestjs/axios';
import { AccountsModule } from './accounts.module';
import { BookingRoomModule } from './booking-room.module';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => AccountsModule),
    forwardRef(() => BookingRoomModule),
    TypeOrmExModule.forCustomRepository([
      SlotRepository,
    ]),
  ],
  controllers: [SlotController],
  providers: [SlotService, KeycloakService],
  exports: [SlotService],
})
export class SlotModule {}
