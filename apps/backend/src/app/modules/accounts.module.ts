import {Module} from "@nestjs/common";
import {UsersController} from "../controllers/users.controller";
import {AccountsService} from "../services/accounts.service";
import {AccountRepository} from "../repositories/account.repository.";
import {TypeOrmModule} from "@nestjs/typeorm";
import {KeycloakService} from "../services/keycloak.service";
import ConfigModule from "./global/config.module";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([AccountRepository]),
  ],
  controllers: [UsersController],
  providers: [AccountsService, KeycloakService]
})
export class AccountsModule {}
