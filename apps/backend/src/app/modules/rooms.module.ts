import { Module } from "@nestjs/common";
import { RoomsController } from "../controllers";
import { RoomsService } from "../services";
import { AccountRepository, RoomsRepository } from "../repositories";
import { HttpModule } from "@nestjs/axios";
import ConfigModule from "./global/config.module";
import { TypeOrmExModule } from "./global/typeorm-ex.module";
import { KeycloakModule } from "./keycloak.module";
import RoomsSearchService from "../services/rooms.search.service";

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      RoomsRepository,
      AccountRepository
    ]),
    HttpModule,
    ConfigModule,
    KeycloakModule
  ],
  controllers: [
    RoomsController
  ],
  providers: [RoomsService, RoomsSearchService],
  exports: [RoomsService]
})
export class RoomsModule {}
