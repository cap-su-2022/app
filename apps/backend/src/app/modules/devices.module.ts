import { forwardRef, Module } from '@nestjs/common';
import { DevicesController } from '../controllers';
import { DevicesService } from '../services';
import { DeviceHistService } from '../services';
import { DevicesRepository } from '../repositories';
import { DeviceHistRepository } from '../repositories';
import { KeycloakService } from '../services';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { AccountsModule } from './accounts.module';
import { BookingRoomModule } from './booking-room.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AccountsModule,
    forwardRef(() => BookingRoomModule),
    TypeOrmExModule.forCustomRepository([
      DevicesRepository,
      DeviceHistRepository,
    ]),
  ],
  controllers: [DevicesController],
  providers: [DevicesService, DeviceHistService, KeycloakService],
  exports: [DevicesService],
})
export class DevicesModule {}
