import { Module } from "@nestjs/common";
import { DevicesController } from "../controllers";
import { EquipmentsHistoryController } from "../controllers";
import { DevicesService } from "../services";
import { DevicesHistService } from "../services";
import { DevicesRepository } from "../repositories";
import { DevicesHistRepository } from "../repositories";
import { KeycloakService } from "../services";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmExModule } from "./global/typeorm-ex.module";

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmExModule.forCustomRepository([
      DevicesRepository,
      DevicesHistRepository
    ])
  ],
  controllers: [
    DevicesController,
    EquipmentsHistoryController
  ],
  providers: [
    DevicesService,
    DevicesHistService,
    KeycloakService
  ],
  exports: [
    DevicesService
  ]
})
export class DevicesModule {}
