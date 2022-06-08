import {Module} from "@nestjs/common";
import {HealthCheckController} from "../controllers/health-check.controller";
import {KeycloakService} from "../services/keycloak.service";
import {HttpModule} from "@nestjs/axios";
import ConfigModule from "./global/config.module";

@Module({
  imports: [
    HttpModule,
    ConfigModule
  ],
  controllers: [HealthCheckController],
  providers: [KeycloakService],
  exports: []
})
export class HealthCheckModule {}
