import {Module} from "@nestjs/common";
import {KeycloakService} from "../services/keycloak.service";
import {KeycloakController} from "../controllers/keycloak.controller";
import {HttpModule} from "@nestjs/axios";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {AccountRepository} from "../repositories/account.repository.";
import ConfigModule from "./global/config.module";
import {AuthenticationService} from "../services/authentication.service";
import {AccountsService} from "../services/accounts.service";

@Module({
  imports: [HttpModule,
    TypeOrmModule.forFeature([
      AccountRepository,
    ]),
    ConfigModule,

  ],
  controllers: [KeycloakController],
  providers: [KeycloakService, ConfigService, AuthenticationService, AccountsService,
  ],
})
export class KeycloakModule {
}
