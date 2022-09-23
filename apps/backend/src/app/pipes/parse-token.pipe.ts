import {ArgumentMetadata, mixin, PipeTransform} from "@nestjs/common";
import {AccountsService, KeycloakService} from "../services";
import {KeycloakUserInstance} from "../dto/keycloak-user.dto";

export const ParseTokenPipe = createParseTokenPipe;

function createParseTokenPipe() {
  class ParseTokenPipe implements PipeTransform {

    constructor(
      private readonly keycloakService: KeycloakService,
      private readonly accountService: AccountsService
    ) {
    }

    async transform(value: any, metadata: ArgumentMetadata): Promise<KeycloakUserInstance> {
      const keycloakUser = await this.keycloakService.getUserInfo(value);
      const accountId = await this.accountService.getAccountIdByKeycloakId(keycloakUser.sub);
      return {
        ...keycloakUser,
        account_id: accountId
      };
    }

  }
  return mixin(ParseTokenPipe);
}
