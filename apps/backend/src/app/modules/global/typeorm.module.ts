import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment } from '@app/constants';
import {
  Accounts,
  BookingRequest,
  Devices,
  DevicesHist,
  Rooms,
  RoomWishlist,
  UsersOTP,
  UsersWarningFlag,
  UsersWarningFlagHistory,
  BookingReasonHist,
  RoomHist,
  RoomTypeHist,
} from '../../models';
import { Roles } from '../../models/role.entity';
import { RoomType } from '../../models';
import { DeviceType } from '../../models/device-type.entity';
import { BookingReason } from '../../models/booking-reason.entity';
import { Slot } from '../../models/slot.entity';

const GlobalTypeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>(Environment.db.postgres.url),
    port: configService.get<number>(Environment.db.postgres.port),
    username: configService.get<string>(Environment.db.postgres.username),
    password: configService.get<string>(Environment.db.postgres.password),
    database: configService.get<string>(Environment.db.postgres.database),
    entities: [
      Accounts,
      Rooms,
      BookingRequest,
      Devices,
      DevicesHist,
      RoomWishlist,
      Rooms,
      UsersOTP,
      UsersWarningFlag,
      UsersWarningFlagHistory,
      Roles,
      RoomType,
      DeviceType,
      BookingReason,
      Slot,
      BookingReasonHist,
      RoomHist,
      RoomTypeHist,
    ],
    synchronize: configService.get<boolean>(
      Environment.db.postgres.synchronize
    ),
    logging: ['query'],
    cache: false,
    timezone: '+7',
  }),
  inject: [ConfigService],
});

export default GlobalTypeOrmModule;
