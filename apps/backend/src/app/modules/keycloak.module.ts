import {Module} from "@nestjs/common";
import {KeycloakService} from "../services/keycloak.service";
import {KeycloakController} from "../controllers/keycloak.controller";
import {HttpModule} from "@nestjs/axios";
import {AuthService} from "../services/auth.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {UsersRepository} from "../repositories/users.repository";
import {RolesRepository} from "../repositories/roles.repository";

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([
    UsersRepository,
    RolesRepository
  ]),
  ],
  controllers: [KeycloakController],
  providers: [KeycloakService, AuthService, ConfigService,
    UsersRepository,
  ],
})
export class KeycloakModule {
}
