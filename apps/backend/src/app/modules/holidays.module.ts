import { BookingRoomModule } from './booking-room.module';
import { AccountsModule } from './accounts.module';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { HolidaysRepository } from '../repositories';
import { HolidaysService, KeycloakService } from '../services';
import { HolidaysController } from '../controllers';
import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,

    forwardRef(() => AccountsModule),
    forwardRef(() => BookingRoomModule),
    TypeOrmExModule.forCustomRepository([HolidaysRepository]),
  ],
  providers: [HolidaysService, KeycloakService],
  exports: [HolidaysService],
  controllers: [HolidaysController],
})
export class HolidaysModule {}
