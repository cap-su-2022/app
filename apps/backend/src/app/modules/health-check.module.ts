import { Module } from "@nestjs/common";
import { HealthCheckController } from "../controllers";
import { KeycloakService } from "../services";
import { HttpModule } from "@nestjs/axios";
import ConfigModule from "./global/config.module";

@Module({
  imports: [
    HttpModule,
    ConfigModule
  ],
  controllers: [
    HealthCheckController
  ],
  providers: [KeycloakService],
  exports: []
})
export class HealthCheckModule {}
