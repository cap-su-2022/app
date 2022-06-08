import { DynamicModule, Global, Scope } from "@nestjs/common";

import { AppController } from "../controllers/app.controller";
import { AppService } from "../services/app.service";
import { KeycloakModule } from "./keycloak.module";
import { RoomsModule } from "./rooms.module";
import { HealthCheckModule } from "./health-check.module";
import { AccountsModule } from "./accounts.module";
import { DevicesModule } from "./devices.module";
import { UsersWarningFlagModule } from "./users-warning-flag.module";
import GlobalCacheModule from "./global/cache.module";
import GlobalConfigModule from "./global/config.module";
import GlobalTypeOrmModule from "./global/typeorm.module";
import { HttpModule } from "@nestjs/axios";
import { BookingRoomModule } from "./booking-room.module";
import { CloudinaryModule } from "./cloudinary.module";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "../guards/role.guard";

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
      exports: [],
      providers: [
        AppService,
        {
          provide: APP_GUARD,
          useClass: RolesGuard,
          scope: Scope.REQUEST,
          inject: [KeycloakModule]
        }
      ]
    }
  }
}
