import { Module } from "@nestjs/common";
import { RoomTypeService } from "../services/room-type.service";
import { RoomTypeController } from "../controllers/room-type.controller";
import { TypeOrmExModule } from "./global/typeorm-ex.module";
import { RoomType } from "../models/room-type.entity";
import {RoomTypeRepository} from "../repositories/room-type.repository";
import {KeycloakService} from "../services";
import ConfigModule from "./global/config.module";
import {HttpModule} from "@nestjs/axios";
import {AccountRepository} from "../repositories";
import {AccountsModule} from "./accounts.module";

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AccountsModule,
    TypeOrmExModule.forCustomRepository([RoomType])
  ],
  exports: [RoomTypeService],
  controllers: [RoomTypeController],
  providers: [RoomTypeService, RoomTypeRepository, KeycloakService]
})
export class RoomTypeModule {

}
