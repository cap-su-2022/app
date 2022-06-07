import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { KeycloakService } from "./keycloak.service";
import { UsernamePasswordCredentials, UsernamePasswordLoginResponse } from "@app/models";
import { Roles } from "../enum/roles.enum";
import { OAuth2Client } from "google-auth-library";
import Exception from "../constants/exception.constant";
import { ConfigService } from "@nestjs/config";
import { AccountRepository } from "../repositories/account.repository.";

@Injectable()
export class AuthenticationService {

  private readonly logger = new Logger(AuthenticationService.name);

  private readonly oAuthClientId: string;
  private readonly oAuthAudience: string[];

  constructor(private readonly usersService: AccountsService,
              private readonly configService: ConfigService,
              private readonly keycloakService: KeycloakService,
              private readonly accountsRepository: AccountRepository) {
    this.oAuthClientId = this.configService.get<string>("firebase.oauth.clientId");
    this.oAuthAudience = this.configService.get<string[]>("firebase.oauth.audience");
  }

  async handleGoogleSignin(idToken: string): Promise<UsernamePasswordLoginResponse> {
    const client = new OAuth2Client(this.oAuthClientId);
    try {
      const decodedToken = await client.verifyIdToken({
        idToken: idToken,
        audience: this.oAuthAudience,
      });

      const userGoogleId = decodedToken.getUserId();
      let keycloakToken = await this.accountsRepository.findKeycloakIdByGoogleId(userGoogleId);
      if (!keycloakToken?.keycloak_id) {
        const updateResp = await this.accountsRepository.updateGoogleIdByEmail(userGoogleId, decodedToken.getPayload().email);
        if (updateResp.affected < 1) {
          throw new HttpException('Invalid account. Please contract to administrator for more information', HttpStatus.UNAUTHORIZED);
        } else {
          keycloakToken = await this.accountsRepository.findKeycloakIdByGoogleId(userGoogleId);
        }
      }
      let keycloakUser;
      let user;

      if (keycloakToken?.keycloak_id) {
        keycloakUser = await this.keycloakService.getAuthenticationTokenByMasterAccount(keycloakToken.keycloak_id);
        user = await this.accountsRepository.findByGoogleId(userGoogleId);
        const doesUserHaveAvatar = await this.accountsRepository.checkIfUserAlreadyHasAvatar(user.id);
        if (!doesUserHaveAvatar) {
          await this.accountsRepository.addAvatarURLById(decodedToken.getPayload().picture, user.id);
        }
      } else {
        throw new HttpException('Invalid account. Please contract to administrator for more information', HttpStatus.UNAUTHORIZED);
      }


      return {
        accessToken: keycloakUser.access_token,
        refreshToken: keycloakUser.refresh_token,
        id: user.id,
        keycloakId: user.keycloakId,
        username: user.username,
        email: user.email,
        phone: user.phone,
        googleId: user.googleId,
        role: Roles.APP_ADMIN,
        fullname: user.fullname,
      };
    } catch (e) {
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
    const keycloakUser = await this.keycloakService.getUserInfo(keycloakToken.access_token);
    const user = await this.usersService.findByKeycloakId(keycloakUser.sub);
    console.log(user);
    return {
      accessToken: keycloakToken.access_token,
      refreshToken: keycloakToken.refresh_token,
      id: user.id,
      keycloakId: keycloakUser.sub,
      username: user.username,
      email: user.email,
      phone: user.phone,
      googleId: user.googleId,
      role: Roles.APP_ADMIN,
      fullname: user.fullname,
    }
  }
}
