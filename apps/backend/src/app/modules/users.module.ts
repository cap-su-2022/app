import {Module} from "@nestjs/common";
import {UsersController} from "../controllers/users.controller";
import {UsersService} from "../services/users.service";
import {UsersRepository} from "../repositories/users.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {KeycloakService} from "../services/keycloak.service";
import ConfigModule from "./global/config.module";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService, KeycloakService]
})
export class UsersModule {}