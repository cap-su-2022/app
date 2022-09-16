import { Module } from "@nestjs/common";
import { HealthCheckController } from "../controllers";
import { KeycloakService } from "../services";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [
    HealthCheckController
  ],
  providers: [KeycloakService],
  exports: []
})
export class HealthCheckModule {}
