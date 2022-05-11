import {DynamicModule, Global} from '@nestjs/common';

import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import {KeycloakModule} from "./keycloak.module";
import {RoomsModule} from "./rooms.module";
import {HealthCheckModule} from "./health-check.module";
import {AuthGuard} from "../guards/auth.guard";
import {KeycloakService} from "../services/keycloak.service";
import {HttpModule} from "@nestjs/axios";
import GlobalConfigModule from "./config.module";
import GlobalTypeOrmModule from "./typeorm.module";
import {UsersModule} from "./users.module";
import {EquipmentsModule} from "./equipments.module";
import {UsersWarningFlagModule} from "./users-warning-flag.module";
import {RolesModule} from "./roles.module";
import GlobalCacheModule from "./cache.module";

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
        HealthCheckModule,
        KeycloakModule,
        RoomsModule,
        UsersModule,
        EquipmentsModule,
        UsersWarningFlagModule,
        RolesModule,
      ],
      controllers: [AppController],
      providers: [
        AppService,
        KeycloakService,
        AuthGuard],
    }
  }
}
