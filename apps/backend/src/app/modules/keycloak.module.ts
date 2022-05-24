import {Module} from "@nestjs/common";
import {KeycloakService} from "../services/keycloak.service";
import {KeycloakController} from "../controllers/keycloak.controller";
import {HttpModule} from "@nestjs/axios";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {UsersRepository} from "../repositories/users.repository";
import ConfigModule from "./global/config.module";
import {AuthenticationService} from "../services/authentication.service";
import {UsersService} from "../services/users.service";

@Module({
  imports: [HttpModule,
    TypeOrmModule.forFeature([
      UsersRepository,
    ]),
    ConfigModule,

  ],
  controllers: [KeycloakController],
  providers: [KeycloakService, ConfigService, AuthenticationService, UsersService,
  ],
})
export class KeycloakModule {
}
