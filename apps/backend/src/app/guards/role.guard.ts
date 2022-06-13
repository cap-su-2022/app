import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/role.decorator";
import { Role } from "../enum/roles.enum";
import { KeycloakService, AccountsService } from "../services";
import { getAccessTokenViaCookie } from "../validators/utils/access-token-extractor.util";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector,
              private readonly keycloakService: KeycloakService,
              private readonly accountsService: AccountsService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const requestHeaders = request.headers;
    const accessToken = requestHeaders["authorization"] ?? getAccessTokenViaCookie(request);
    const keycloakUser = await this.keycloakService.getUserInfo(accessToken);
    const accountRole = await this.accountsService.getAccountRoleByKeycloakId(keycloakUser.sub);

    return requiredRoles.some((role) => accountRole === role);
  }
}
