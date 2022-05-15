import {Module} from "@nestjs/common";
import {EquipmentsController} from "../controllers/equipments.controller";
import {EquipmentsHistoryController} from "../controllers/equipments-history.controller";
import {EquipmentsService} from "../services/equipments.service";
import {EquipmentsHistoryService} from "../services/equipments-history.service";
import {EquipmentsRepository} from "../repositories/equipments.repository";
import {EquipmentsHistoryRepository} from "../repositories/equipments-history.repository";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([EquipmentsRepository, EquipmentsHistoryRepository]),
  ],
  controllers: [
    EquipmentsController,
    EquipmentsHistoryController,
  ],
  providers: [
    EquipmentsService,
    EquipmentsHistoryService,
    EquipmentsRepository,
    EquipmentsHistoryRepository,
  ]
})
export class EquipmentsModule {}
