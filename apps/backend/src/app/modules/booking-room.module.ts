import { forwardRef, Module } from '@nestjs/common';
import { BookingRoomController } from '../controllers';
import { BookingRoomService } from '../services';
import { BookingRoomRepository } from '../repositories';
import { RoomsModule } from './rooms.module';
import { KeycloakModule } from './keycloak.module';
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
import { BookingFeedbackModule } from './booking-feedback.module';
import {HolidaysModule} from "./holidays.module";

@Module({
  imports: [
    forwardRef(() => NotificationModule),
    forwardRef(() => KeycloakModule),
    forwardRef(() => AccountsModule),
    forwardRef(() => RoomTypeModule),
    forwardRef(() => DevicesModule),
    forwardRef(() => RoomsModule),
    forwardRef(() => SlotModule),
    forwardRef(() => BookingFeedbackModule),
    forwardRef(() => HolidaysModule),

    TypeOrmExModule.forCustomRepository([
      BookingRoomRepository,
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
