import { DynamicModule, Global, Scope } from '@nestjs/common';

import { KeycloakModule } from './keycloak.module';
import { RoomsModule } from './rooms.module';
import { HealthCheckModule } from './health-check.module';
import { AccountsModule } from './accounts.module';
import { DevicesModule } from './devices.module';
import GlobalConfigModule from './global/config.module';
import GlobalTypeOrmModule from './global/typeorm.module';
import { HttpModule } from '@nestjs/axios';
import { BookingRoomModule } from './booking-room.module';
import { CloudinaryModule } from './cloudinary.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guards/role.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { RolesModule } from './roles.module';
import { RoomTypeModule } from './room-type.module';
import { DeviceTypeModule } from './device-type.module';
import { BookingReasonModule } from './booking-reason.module';
import { SlotModule } from './slot.module';
import { FeedbackModule } from './feedback.module';
import { FeedbackTypeModule } from './feedback-type.module';
import { NotificationModule } from './notification.module';
import { BookingFeedbackModule } from './booking-feedback.module';
import {AppConfigModule} from "./app-config.module";

@Global()
export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        GlobalConfigModule,
        GlobalTypeOrmModule,
        HttpModule,
        CloudinaryModule,
        HealthCheckModule,
        KeycloakModule,
        AppConfigModule,
        RoomsModule,
        AccountsModule,
        FeedbackModule,
        BookingFeedbackModule,
        FeedbackTypeModule,
        NotificationModule,
        DevicesModule,
        BookingRoomModule,
        RoomTypeModule,
        DeviceTypeModule,
        BookingReasonModule,
        RolesModule,
        SlotModule,
        ScheduleModule.forRoot(),
      ],
      controllers: [],
      exports: [],
      providers: [
        {
          provide: APP_GUARD,
          useClass: RolesGuard,
          scope: Scope.REQUEST,
          inject: KeycloakModule as never,
        },
      ],
    };
  }
}
