import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HealthCheckModule} from "./modules/health-check.module";
import {KeycloakModule} from "./modules/keycloak.module";
import ConfigModule from "./modules/global/config.module";
import {TypeOrmConfigService} from "./constant/typeorm-config";
import GlobalTypeOrmModule from "./modules/global/typeorm.module";

@Module({
  imports: [
    ConfigModule,
    GlobalTypeOrmModule,
    HealthCheckModule,
    KeycloakModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
