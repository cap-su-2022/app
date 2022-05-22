import {HttpException, HttpStatus, Injectable, Logger} from "@nestjs/common";
import {UsersService} from "./users.service";
import {KeycloakService} from "./keycloak.service";
import {UsernamePasswordCredentials, UsernamePasswordLoginResponse} from "@app/models";
import {Roles} from "../enum/roles.enum";
import {OAuth2Client} from "google-auth-library";
import Exception from "../constants/exception.constant";
import {ConfigService} from "@nestjs/config";
import {UsersRepository} from "../repositories/users.repository";

@Injectable()
export class AuthenticationService {

  private readonly logger = new Logger(AuthenticationService.name);

  private readonly oAuthClientId: string;
  private readonly oAuthAudience: string[];

  constructor(private readonly usersService: UsersService,
              private readonly configService: ConfigService,
              private readonly keycloakService: KeycloakService,
              private readonly usersRepository: UsersRepository) {
    this.oAuthClientId = this.configService.get<string>("firebase.oauth.clientId");
    this.oAuthAudience = this.configService.get<string[]>("firebase.oauth.audience");
  }

  async handleGoogleSignin(idToken: string): Promise<any> {
    const client = new OAuth2Client(this.oAuthClientId);
    console.log(idToken);
    try {
      const decodedToken = await client.verifyIdToken({
        idToken: idToken,
        audience: this.oAuthAudience,

      })
      const userGoogleId = decodedToken.getUserId();
      const user = await this.usersRepository.findByGoogleId(userGoogleId);
      console.log(user);

      return user;
    } catch(e) {
      this.logger.error(e);
      this.handleGoogleSignInException(e);
    }
  }

  handleGoogleSignInException(e) {
    if (`${e} `.includes('Token used too late')) {
      throw new HttpException(Exception.googleAccessTokenException.expired, HttpStatus.BAD_REQUEST);
    } else if (`${e} `.includes("Invalid token signature")) {
      throw new HttpException(Exception.googleAccessTokenException.invalidToken, HttpStatus.BAD_REQUEST);
    } else {
      throw new HttpException(Exception.googleAccessTokenException.invalidToken, HttpStatus.BAD_REQUEST);
    }
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
