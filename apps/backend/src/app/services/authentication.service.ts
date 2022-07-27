import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { KeycloakService } from './keycloak.service';
import {
  UsernamePasswordCredentials,
  UsernamePasswordLoginResponse,
} from '@app/models';
import { OAuth2Client } from 'google-auth-library';
import Exception from '../constants/exception.constant';
import { ConfigService } from '@nestjs/config';
import { Accounts } from '../models';
import { RoleService } from './role.service';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  private readonly oAuthClientId: string;
  private readonly oAuthAudience: string[];

  constructor(
    private readonly accountService: AccountsService,
    private readonly configService: ConfigService,
    private readonly keycloakService: KeycloakService
  ) {
    this.oAuthClientId = this.configService.get<string>(
      'firebase.oauth.clientId'
    );
    this.oAuthAudience = this.configService.get<string[]>(
      'firebase.oauth.audience'
    );
  }

  async handleGoogleSignin(
    idToken: string
  ): Promise<UsernamePasswordLoginResponse> {
    const client = new OAuth2Client(this.oAuthClientId);
    try {
      const decodedToken = await client.verifyIdToken({
        idToken: idToken,
        audience: this.oAuthAudience,
      });

      const userGoogleId = decodedToken.getUserId();

      let keycloakToken = await this.accountService.getKeycloakIdByGoogleId(
        userGoogleId
      );
      if (keycloakToken === undefined) {
        await this.accountService.updateGoogleIdByAccountEmail(
          userGoogleId,
          decodedToken.getPayload().email
        );
        keycloakToken = await this.accountService.getKeycloakIdByGoogleId(
          userGoogleId
        );
      }
      let keycloakUser;
      let user: Accounts;

      if (keycloakToken !== undefined) {
        keycloakUser =
          await this.keycloakService.getAuthenticationTokenByMasterAccount(
            keycloakToken
          );
        user = await this.accountService.getAccountByGoogleId(userGoogleId);
        const doesUserHaveAvatar =
          await this.accountService.checkIfAccountAlreadyHasAvatarImage(
            user.id
          );
        if (!doesUserHaveAvatar) {
          await this.accountService.addGoogleAvatarURLByAccountId(
            decodedToken.getPayload().picture,
            user.id
          );
        }
      } else {
        throw new HttpException(
          'Invalid account. Please contract to administrator for more information',
          HttpStatus.UNAUTHORIZED
        );
      }

      const roleName = await this.accountService.getAccountRoleById(user.id);

      return {
        accessToken: keycloakUser.access_token,
        refreshToken: keycloakUser.refresh_token,
        id: user.id,
        keycloakId: user.keycloakId,
        username: user.username,
        email: user.email,
        phone: user.phone,
        googleId: user.googleId,
        role: roleName,
        fullname: user.fullname,
        avatar: user.avatar,
      };
    } catch (e) {
      this.logger.error(e);
      this.handleGoogleSignInException(e);
    }
  }

  handleGoogleSignInException(e) {
    if (`${e} `.includes('Token used too late')) {
      throw new HttpException(
        Exception.googleAccessTokenException.expired,
        HttpStatus.BAD_REQUEST
      );
    } else if (`${e} `.includes('Invalid token signature')) {
      throw new HttpException(
        Exception.googleAccessTokenException.invalidToken,
        HttpStatus.BAD_REQUEST
      );
    } else {
      throw new HttpException(
        Exception.googleAccessTokenException.invalidToken,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async handleUsernamePasswordLogin(
    credentials: UsernamePasswordCredentials
  ): Promise<UsernamePasswordLoginResponse> {
    const keycloakToken = await this.keycloakService.signInToKeycloak(
      credentials.username,
      credentials.password
    );

    const keycloakUser = await this.keycloakService.getUserInfo(
      keycloakToken.access_token
    );

    const user = await this.accountService.findByKeycloakId(keycloakUser.sub);
    const roleName = await this.accountService.getAccountRoleById(user.id);

    return {
      accessToken: keycloakToken.access_token,
      refreshToken: keycloakToken.refresh_token,
      id: user.id,
      keycloakId: keycloakUser.sub,
      username: user.username,
      email: user.email,
      phone: user.phone,
      googleId: user.googleId,
      role: roleName,
      fullname: user.fullname,
      avatar: user.avatar,
    };
  }
}
