import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment } from '@app/constants';
import {
  Accounts,
  AccountHist,
  BookingRequest,
  BookingRequestHist,
  Devices,
  DeviceHist,
  Rooms,
  RoomWishlist,
  UsersOTP,
  UsersWarningFlag,
  UsersWarningFlagHistory,
  BookingReasonHist,
  RoomHist,
  RoomTypeHist,
  DeviceTypeHist,
  BookingRequestDevices,
} from '../../models';
import { Roles } from '../../models/role.entity';
import { RoomType } from '../../models';
import { DeviceType } from '../../models/device-type.entity';
import { BookingReason } from '../../models/booking-reason.entity';
import { Slot } from '../../models/slot.entity';
import { RoleHist } from '../../models/role-hist.entity';

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
      AccountHist,
      Rooms,
      RoomHist,
      RoomType,
      RoomTypeHist,
      Devices,
      DeviceType,
      DeviceHist,
      DeviceTypeHist,
      BookingRequest,
      BookingRequestHist,
      RoomWishlist,
      UsersOTP,
      UsersWarningFlag,
      UsersWarningFlagHistory,
      Roles,
      RoleHist,
      BookingReason,
      Slot,
      BookingReasonHist,
      BookingRequestDevices,
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
