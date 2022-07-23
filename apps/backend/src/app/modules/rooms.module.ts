import { forwardRef, Module } from '@nestjs/common';
import { RoomsController } from '../controllers';
import { RoomsService } from '../services';
import { AccountRepository, RoomsRepository } from '../repositories';
import { HttpModule } from '@nestjs/axios';
import ConfigModule from './global/config.module';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { KeycloakModule } from './keycloak.module';
import { AccountsModule } from './accounts.module';
import { RoomHistRepository } from '../repositories/room-hist.repository';
import { RoomHistService } from '../services/room-hist.service';
import { BookingRoomModule } from './booking-room.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    KeycloakModule,
    AccountsModule,
    forwardRef(() => BookingRoomModule),
    TypeOrmExModule.forCustomRepository([RoomsRepository, RoomHistRepository]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomHistService],
  exports: [RoomsService, RoomHistService],
})
export class RoomsModule {}
