import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UseInterceptors
} from "@nestjs/common";
import { KeycloakService } from "../services/keycloak.service";
import { PathLoggerInterceptor } from "../interceptors/path-logger.interceptor";

@Injectable()
@UseInterceptors(new PathLoggerInterceptor(AuthGuard.name))
export class AuthGuard implements CanActivate {

  private static LOGGER = new Logger(AuthGuard.name);

  constructor(private readonly keycloakService: KeycloakService) {
  }

  async canActivate(context: ExecutionContext) {
    return true;
    const request = context.switchToHttp().getRequest<Request>();
    let accessToken;
    if (request.url.endsWith('health/auth')) {
      accessToken = request.headers['authorization'] ?? `${request.headers['cookie']?.split(';')
        .map(k => k.trim()).find(k => k.startsWith('accessToken='))?.split("=")[1]}`;
    } else {
      accessToken = `${request.headers['cookie']?.split(';')
        .map(k => k.trim()).find(k => k.startsWith('accessToken='))?.split("=")[1]}`;
    }
    if (!accessToken) {
      return false;
    }
    const resp = await this.keycloakService.getUserInfo(accessToken);

    return !!resp;
  }




}
