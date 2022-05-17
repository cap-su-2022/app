import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {KeycloakService} from "../services/keycloak.service";

@Injectable()
export class AuthGuard implements CanActivate {

  private static LOGGER = new Logger(AuthGuard.name);

  constructor(private readonly keycloakService: KeycloakService) {
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    AuthGuard.LOGGER.log(request.url);
    AuthGuard.LOGGER.debug(request.body);
    let accessToken;
    if (request.url.endsWith('health/auth')) {
      accessToken = request.headers['authorization'];
    } else {
      accessToken = `Bearer ${request.headers['cookie'].split(';')
        .map(k => k.trim()).find(k => k.startsWith('accessToken=')).split("=")[1]}`;
    }
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
