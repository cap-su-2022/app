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

@Global()
export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        GlobalConfigModule,
        GlobalTypeOrmModule,
        HttpModule,
        HealthCheckModule,
        KeycloakModule,
        RoomsModule,
      ],
      controllers: [AppController],
      providers: [
        AppService,
        KeycloakService,
        AuthGuard],
    }
  }
}
