import {Controller, Get} from "@nestjs/common";
import {KeycloakService} from "../services/keycloak.service";

@Controller('keycloak')
export class KeycloakController {

  constructor(private readonly keycloakService: KeycloakService) {

  }

  @Get()
  getAllKeycloakUsers() {
    return this.keycloakService.getAllUsers();
  }
}
