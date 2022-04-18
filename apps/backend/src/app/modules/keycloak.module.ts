import {Module} from "@nestjs/common";
import {KeycloakService} from "../services/keycloak.service";
import {KeycloakController} from "../controllers/keycloak.controller";
import {HttpModule} from "@nestjs/axios";
import {AuthService} from "../services/auth.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Rooms} from "../models/rooms.entity";
import {Users} from "../models/users.entity";
import {Roles} from "../models/roles.entity";

@Module({
  imports: [HttpModule,     TypeOrmModule.forFeature([Users, Roles]),
  ],
  controllers: [KeycloakController],
  providers: [KeycloakService, AuthService, ],
})
export class KeycloakModule {}
