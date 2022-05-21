import {Injectable} from "@nestjs/common";
import {KeycloakRepository} from "../repositories/keycloak.repository";

@Injectable()
export class KeycloakService {
  constructor(private readonly keycloakRepository: KeycloakRepository) {
  }

  getAllUsers() {
    return this.keycloakRepository.getKeycloakUsers();
  }
}
