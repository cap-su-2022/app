import {Module} from "@nestjs/common";
import {HealthCheckController} from "../controllers/health-check.controller";
import {KeycloakModule} from "./keycloak.module";
import {AuthGuard} from "../guards/auth.guard";
import {KeycloakService} from "../services/keycloak.service";
import {HttpModule, HttpService} from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [HealthCheckController],
  providers: [ KeycloakService, AuthGuard],
  exports: []
})
export class HealthCheckModule {}
