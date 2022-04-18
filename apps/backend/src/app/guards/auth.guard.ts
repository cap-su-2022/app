import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {KeycloakService} from "../services/keycloak.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly keycloakService: KeycloakService) {
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.headers['authorization'];
    if (!accessToken) {
      return false;
    }
    const resp = await this.keycloakService.getUserInfo(accessToken);
    if (resp?.error) {
      throw new HttpException(resp['error_description'], HttpStatus.UNAUTHORIZED);
    }

    return !!resp;

  }




}
