import { forwardRef, Module } from '@nestjs/common';
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
import { BookingRoomDevicesRepository } from '../repositories';
import { NotificationModule } from './notification.module';
import { BookingRoomGateway } from '../gateway/booking-room.gateway';

@Module({
  imports: [
    RoomWishlistModule,
    KeycloakModule,
    AccountsModule,
    NotificationModule,
    forwardRef(() => RoomTypeModule),
    forwardRef(() => DevicesModule),
    forwardRef(() => RoomsModule),
    forwardRef(() => SlotModule),

    TypeOrmExModule.forCustomRepository([
      BookingRoomRepository,
      AccountRepository,
      BookingRequestHistRepository,
      BookingRoomDevicesRepository,
    ]),
  ],
  controllers: [BookingRoomController],
  providers: [
    BookingRoomService,
    TasksService,
    BookingRequestHistService,
    BookingRoomDevicesService,
    BookingRoomGateway,
  ],
  exports: [
    BookingRoomService,
    BookingRequestHistService,
    BookingRoomDevicesService,
  ],
})
export class BookingRoomModule {}
