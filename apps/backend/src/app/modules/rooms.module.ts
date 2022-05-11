import {Module} from "@nestjs/common";
import {RoomsController} from "../controllers/rooms.controller";
import {RoomsService} from "../services/rooms.service";
import {RoomsRepository} from "../repositories/rooms.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Rooms} from "../models";
import {AutomapperModule} from "@automapper/nestjs";
import {classes} from "@automapper/classes";
import {RoomsProfile} from "../profiles/rooms.profile";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomsRepository]),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),

  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsProfile],
})
export class RoomsModule {}
