import {Injectable} from "@nestjs/common";
import {UsersService} from "./users.service";
import {KeycloakService} from "./keycloak.service";
import {UsernamePasswordCredentials, UsernamePasswordLoginResponse} from "@app/models";
import {Roles} from "../enum/roles.enum";

@Injectable()
export class AuthenticationService {

  constructor(private readonly usersService: UsersService,
              private readonly keycloakService: KeycloakService) {
  }


  async handleUsernamePasswordLogin(credentials: UsernamePasswordCredentials): Promise<UsernamePasswordLoginResponse> {
    const keycloakToken = await this.keycloakService.signInToKeycloak(credentials.username, credentials.password);
    const keycloakUser = await this.keycloakService.getUserByUsername(credentials.username, keycloakToken.access_token);
    const user = await this.usersService.findByKeycloakId(keycloakUser.id);
    return {
      accessToken: keycloakToken.access_token,
      refreshToken: keycloakToken.refresh_token,
      id: user.id,
      keycloakId: keycloakUser.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      googleId: user.googleId,
      role: Roles.APP_ADMIN,
      fullname: user.fullname,
    }
  }
}
