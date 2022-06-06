import { ArgumentMetadata, Inject, Injectable, PipeTransform } from "@nestjs/common";
import { KeycloakService } from "../services/keycloak.service";
import { KeycloakUserInfoDTO } from "../dto/keycloak-user-info.dto";

@Injectable()
export class ParseTokenPipe implements PipeTransform {

  constructor(private readonly keycloakService: KeycloakService) {
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<KeycloakUserInfoDTO> {
    return this.keycloakService.getUserInfo(value);
  }

}
