import {Module} from "@nestjs/common";
import {RoomsController} from "../controllers/rooms.controller";
import {RoomsService} from "../services/rooms.service";
import {RoomsRepository} from "../repositories/rooms.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AutomapperModule} from "@automapper/nestjs";
import {classes} from "@automapper/classes";
import {RoomsProfile} from "../profiles/rooms.profile";
import {KeycloakModule} from "./keycloak.module";
import {KeycloakService} from "../services/keycloak.service";
import {HttpModule, HttpService} from "@nestjs/axios";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomsRepository]),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    HttpModule
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsProfile, KeycloakService],
})
export class RoomsModule {}
