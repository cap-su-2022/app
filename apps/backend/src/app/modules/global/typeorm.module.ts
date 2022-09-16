import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Environment } from '@app/constants';
import {
  Accounts,
  AccountHist,
  BookingRequest,
  BookingRequestHist,
  Devices,
  DeviceHist,
  Rooms,
  BookingReasonHist,
  RoomHist,
  RoomTypeHist,
  DeviceTypeHist,
  BookingRequestDevices,
  Holidays,
} from '../../models';
import {Roles} from '../../models/role.entity';
import {RoomType} from '../../models';
import {DeviceType} from '../../models';
import {BookingReason} from '../../models/booking-reason.entity';
import {Slot} from '../../models/slot.entity';
import {RoleHist} from '../../models/role-hist.entity';
import {AccountNotification} from '../../models';
import {BookingRoomFeedback} from '../../models';
import {Feedback} from '../../models';
import {FeedbackType} from '../../models';
import {Notification} from '../../models';
import {environment} from "../../../environments/environment";

const GlobalTypeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: () => ({
    type: 'postgres',
    host: environment.database.host,
    port: environment.database.port,
    username: environment.database.username,
    password: environment.database.password,
    database: environment.database.name,
    entities: [
      Accounts,
      AccountHist,
      AccountNotification,
      BookingReason,
      BookingReasonHist,
      BookingRequest,
      BookingRequestHist,
      BookingRequestDevices,
      BookingRoomFeedback,
      Devices,
      DeviceType,
      DeviceHist,
      DeviceTypeHist,
      Feedback,
      FeedbackType,
      Notification,
      Rooms,
      RoomHist,
      RoomType,
      RoomTypeHist,
      Roles,
      RoleHist,
      Slot,
      Holidays
    ],
    synchronize: environment.database.synchronize,
    logging: ['query'],
    cache: false,
    timezone: '+7',
    extra: {
      // based on  https://node-postgres.com/api/pool
      // max connection pool size
      max: 10,
      // connection timeout
      connectionTimeoutMillis: 1000,
    },
  }),
  inject: [],
});

export default GlobalTypeOrmModule;
