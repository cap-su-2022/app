import {Module} from "@nestjs/common";
import {KeycloakService} from "../services/keycloak.service";
import {KeycloakController} from "../controllers/keycloak.controller";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [KeycloakController],
  providers: [KeycloakService],
})
export class KeycloakModule {}
