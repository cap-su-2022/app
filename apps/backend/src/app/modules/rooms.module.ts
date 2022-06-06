import {Module} from "@nestjs/common";
import {RoomsController} from "../controllers/rooms.controller";
import {RoomsService} from "../services/rooms.service";
import {RoomsRepository} from "../repositories/rooms.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {KeycloakService} from "../services/keycloak.service";
import {HttpModule} from "@nestjs/axios";
import ConfigModule from "./global/config.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomsRepository]),
    HttpModule,
    ConfigModule
  ],
  controllers: [RoomsController],
  providers: [RoomsService, KeycloakService],
  exports: [RoomsService]
})
export class RoomsModule {}
