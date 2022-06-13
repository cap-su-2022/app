import { ArgumentMetadata, Inject, Injectable, PipeTransform } from "@nestjs/common";
import { KeycloakService } from "../services";
import { KeycloakUserInstance } from "../dto/keycloak.user";
import { AccountRepository } from "../repositories";

@Injectable()
export class ParseTokenPipe implements PipeTransform {

  constructor(private readonly keycloakService: KeycloakService,
              private readonly accountsRepository: AccountRepository) {
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<KeycloakUserInstance> {
    const keycloakUser = await this.keycloakService.getUserInfo(value);
    const accountId = await this.accountsRepository.findIdByKeycloakId(keycloakUser.sub);
    return {
      ...keycloakUser,
      account_id: accountId
    };
  }

}
