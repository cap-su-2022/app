import { Module } from "@nestjs/common";
import { RoomTypeService } from "../services/room-type.service";
import { RoomTypeController } from "../controllers/room-type.controller";
import { TypeOrmExModule } from "./global/typeorm-ex.module";
import { RoomType } from "../models/room-type.entity";

@Module({
  imports: [TypeOrmExModule.forCustomRepository([RoomType])],
  exports: [RoomTypeService],
  controllers: [RoomTypeController],
  providers: [RoomTypeService, ]
})
export class RoomTypeModule {

}
