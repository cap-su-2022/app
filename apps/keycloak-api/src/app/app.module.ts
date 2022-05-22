import {DynamicModule, Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HealthCheckModule} from "./modules/health-check.module";
import {KeycloakModule} from "./modules/keycloak.module";
import ConfigModule from "./modules/global/config.module";
import GlobalTypeOrmModule from "./modules/global/typeorm.module";

export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule,
        GlobalTypeOrmModule,
        HealthCheckModule,
        KeycloakModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }
  }
}
