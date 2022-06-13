import { Module } from "@nestjs/common";
import { DevicesController } from "../controllers";
import { EquipmentsHistoryController } from "../controllers";
import { DevicesService } from "../services";
import { DevicesHistService } from "../services";
import { DevicesRepository } from "../repositories";
import { DevicesHistRepository } from "../repositories";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KeycloakService } from "../services";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([
      DevicesRepository,
      DevicesHistRepository
    ])
  ],
  controllers: [
    DevicesController,
    EquipmentsHistoryController,
  ],
  providers: [
    DevicesService,
    DevicesHistService,
    KeycloakService
  ]
})
export class DevicesModule {}
