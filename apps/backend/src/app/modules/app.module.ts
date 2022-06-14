import { DynamicModule, Global, Scope } from "@nestjs/common";

import { AppController } from "../controllers";
import { AppService } from "../services";
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
import GlobalElasticSearchModule from "./global/elastic-search.module";
import { RoomWishlistModule } from "./room-wishlist.module";

@Global()
export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        GlobalCacheModule,
        GlobalConfigModule,
        GlobalTypeOrmModule,
        GlobalElasticSearchModule,
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
      controllers: [],
      exports: [
        GlobalElasticSearchModule
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: RolesGuard,
          scope: Scope.REQUEST,
          inject: [KeycloakModule]
        }
      ]
    };
  }
}
