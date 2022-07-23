import { Module } from '@nestjs/common';
import { BookingRoomController } from '../controllers';
import { BookingRoomService } from '../services';
import { AccountRepository, BookingRoomRepository } from '../repositories';
import { RoomsModule } from './rooms.module';
import { KeycloakModule } from './keycloak.module';
import { RoomWishlistModule } from './room-wishlist.module';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { DevicesModule } from './devices.module';
import { TasksService } from '../services/task.service';
import { AccountsModule } from './accounts.module';
import { RoomTypeModule } from './room-type.module';
import { BookingRequestHistService } from '../services/booking-room-hist.service';
import { BookingRequestHistRepository } from '../repositories/booking-request-hist.repository';
import { SlotModule } from './slot.module';
import { BookingRoomDevicesService } from '../services/booking-request-devices.service';
import { BookingRoomDevicesRepository } from '../repositories/booking-request-devices.repository';
import { SlotService } from '../services/slot.service';
import { BookingRoomModule } from './booking-room.module';
import { SlotController } from '../controllers/slots.controller';

@Module({
  imports: [
    BookingRoomModule,
    SlotModule,
  ],
  controllers: [BookingRoomController, SlotController],
  providers: [BookingRoomService, SlotService],
  exports: [BookingRoomService, SlotService],
})
export class RequestSlotModule {}
