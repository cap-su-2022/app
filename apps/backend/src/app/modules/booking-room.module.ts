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

@Module({
  imports: [
    DevicesModule,
    RoomWishlistModule,
    KeycloakModule,
    RoomsModule,
    AccountsModule,
    RoomTypeModule,
    SlotModule,

    TypeOrmExModule.forCustomRepository([
      BookingRoomRepository,
      AccountRepository,
      BookingRequestHistRepository,
      BookingRoomDevicesRepository
    ]),
  ],
  controllers: [BookingRoomController],
  providers: [BookingRoomService, TasksService, BookingRequestHistService, BookingRoomDevicesService],
  exports: [BookingRoomService, BookingRequestHistService, BookingRoomDevicesService],
})
export class BookingRoomModule {}
