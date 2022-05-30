import {Module} from "@nestjs/common";
import {DevicesController} from "../controllers/devices.controller";
import {EquipmentsHistoryController} from "../controllers/equipments-history.controller";
import {DevicesService} from "../services/devices.service";
import {EquipmentsHistoryService} from "../services/equipments-history.service";
import {DevicesRepository} from "../repositories/devices.repository";
import {EquipmentsHistoryRepository} from "../repositories/equipments-history.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import { KeycloakService } from "../services/keycloak.service";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([DevicesRepository, EquipmentsHistoryRepository]),
  ],
  controllers: [
    DevicesController,
    EquipmentsHistoryController,
  ],
  providers: [
    DevicesService,
    EquipmentsHistoryService,
    KeycloakService
  ]
})
export class DevicesModule {}
