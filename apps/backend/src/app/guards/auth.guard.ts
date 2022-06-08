import { CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { Observable } from "rxjs";
import { KeycloakService } from "../services/keycloak.service";
import { Request } from "express";
import { getAccessTokenViaCookie } from "../validators/utils/access-token-extractor.util";

export default class AuthGuard implements CanActivate {

  constructor(@Inject(KeycloakService) private readonly keycloakService: KeycloakService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = getAccessTokenViaCookie(request);
    const response = await this.keycloakService.getUserInfo(accessToken);
    return !!response;
  }

}
