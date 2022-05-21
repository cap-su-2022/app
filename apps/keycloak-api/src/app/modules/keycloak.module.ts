import {Module} from "@nestjs/common";
import {KeycloakService} from "../services/keycloak.service";
import {KeycloakController} from "../controllers/keycloak.controller";
import {ConfigService} from "@nestjs/config";
import {TypeOrmConfigService} from "../constant/typeorm-config";
import ConfigModule from "./global/config.module";
import {KeycloakRepository} from "../repositories/keycloak.repository";
import {Connection} from "typeorm";

@Module({

  imports: [ConfigModule
    ],
  exports: [],
  controllers: [KeycloakController],
  providers: [KeycloakService, TypeOrmConfigService, KeycloakRepository]
})
export class KeycloakModule {

}
