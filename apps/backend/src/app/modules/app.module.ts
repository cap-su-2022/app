import {DynamicModule, Global} from '@nestjs/common';

import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import {KeycloakModule} from "./keycloak.module";
import {RoomsModule} from "./rooms.module";
import {HealthCheckModule} from "./health-check.module";
import {AccountsModule} from "./accounts.module";
import {DevicesModule} from "./devices.module";
import {UsersWarningFlagModule} from "./users-warning-flag.module";
import GlobalCacheModule from "./global/cache.module";
import GlobalConfigModule from "./global/config.module";
import GlobalTypeOrmModule from "./global/typeorm.module";
import {KeycloakService} from "../services/keycloak.service";
import {AuthGuard} from "../guards/auth.guard";
import {HttpModule} from "@nestjs/axios";
import { BookingRoomModule } from "./booking-room.module";
import { CloudinaryModule } from "./cloudinary.module";

@Global()
export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        GlobalCacheModule,
        GlobalConfigModule,
        GlobalTypeOrmModule,
        HttpModule,
        CloudinaryModule,
        HealthCheckModule,
        KeycloakModule,
        RoomsModule,
        AccountsModule,
        DevicesModule,
        UsersWarningFlagModule,
        BookingRoomModule
      ],
      controllers: [AppController],
      providers: [
        AppService,
        KeycloakService,
        AuthGuard],
    }
  }
}
