import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  Scope,
  UnauthorizedException
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom, map, Observable } from "rxjs";
import { KeycloakSigninSuccessResponse } from "../dto/keycloak-signin-success.response.dto";
import { KeycloakUser } from "@app/models";
import { ConfigService } from "@nestjs/config";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { APPLICATION_X_WWW_FORM_URLENCODED, Environment } from "@app/constants";
import { KeycloakUserInfoDTO } from "../dto/keycloak-user-info.dto";

@Injectable({
  scope: Scope.REQUEST
})
export class KeycloakService {

  private readonly logger = new Logger(KeycloakService.name);

  private readonly keycloakHost: string;
  private readonly keycloakPort: number;
  private readonly keycloakRealm: string;
  private readonly grantTypePassword: string;
  private readonly clientId: string;
  private readonly masterUsername: string;
  private readonly masterPassword: string;
  private readonly grantTypeRefreshToken: string;
  private readonly grantTypeTokenExchange: string;
  private readonly clientSecret: string;

  constructor(private readonly configService: ConfigService,
              private readonly httpService: HttpService,
              @Inject(REQUEST) private readonly httpRequest: Request) {
    this.keycloakHost = this.configService.get<string>(Environment.keycloak.host);
    this.keycloakPort = this.configService.get<number>(Environment.keycloak.port);
    this.keycloakRealm = this.configService.get<string>(Environment.keycloak.client.realm);
    this.grantTypePassword = this.configService.get<string>(Environment.keycloak.grant_type.password);
    this.clientId = this.configService.get<string>(Environment.keycloak.client.id);
    this.masterUsername = this.configService.get<string>(Environment.keycloak.master_username);
    this.masterPassword = this.configService.get<string>(Environment.keycloak.master_password);
    this.grantTypeRefreshToken = this.configService.get<string>(Environment.keycloak.grant_type.refresh_token);
    this.grantTypeTokenExchange = this.configService.get<string>(Environment.keycloak.grant_type.token_exchange);
    this.clientSecret = this.configService.get<string>(Environment.keycloak.client.secret);
  }

  async getAuthenticationTokenByMasterAccount(keycloakId: string): Promise<KeycloakSigninSuccessResponse> {
    const { access_token } = await this.signInToKeycloak(this.masterUsername, this.masterPassword);
    const url = `http://${this.keycloakHost}:${this.keycloakPort}/auth/realms/${this.keycloakRealm}/protocol/openid-connect/token`;
    const payload = new URLSearchParams({
      grant_type: this.grantTypeTokenExchange,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      audience: this.clientId,
      requested_subject: keycloakId,
      subject_token: access_token,
      requested_token_type: this.grantTypeRefreshToken
    });
    const config = {
      headers: {
        "Content-Type": APPLICATION_X_WWW_FORM_URLENCODED
      }
    };
    try {
      const response = await lastValueFrom(this.httpService.post(url, payload, config));
      return response.data as KeycloakSigninSuccessResponse;
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.response?.data["error_description"], HttpStatus.UNAUTHORIZED);
    }
  }

  countUsers(token: string): Observable<number> {
    const COUNT_USERS_URI = "http://localhost:8080/auth/admin/realms/authentication/users/count";
    try {
      return this.httpService.get(COUNT_USERS_URI, {
        headers: {
          "Authorization": token
        }
      }).pipe(map(e => e.data));
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getAllUsers(token: string): Promise<number> {
    const USERS_URI = "http://localhost:9090/auth/admin/realms/authentication/users";
    try {
      return await lastValueFrom(this.httpService.get(USERS_URI, {
        headers: {
          "Authorization": token
        }
      }).pipe(map(e => e.data)));
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async signInToKeycloak(username: string, password: string): Promise<KeycloakSigninSuccessResponse> {
    const url = `http://${this.keycloakHost}:${this.keycloakPort}/auth/realms/${this.keycloakRealm}/protocol/openid-connect/token`;
    const signInPayload = new URLSearchParams({
      client_id: this.configService.get<string>(Environment.keycloak.client.id),
      client_secret: this.configService.get<string>(Environment.keycloak.client.secret),
      grant_type: this.configService.get<string>(Environment.keycloak.grant_type.password),
      username: username,
      password: password
    });
    try {
      const response = await lastValueFrom(this.httpService.post(url, signInPayload, {
        headers: {
          "Content-Type": APPLICATION_X_WWW_FORM_URLENCODED
        }
      }));
      return response.data as KeycloakSigninSuccessResponse;
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.response?.data["error_description"], HttpStatus.UNAUTHORIZED);
    }
  }

  async getUserByUsername(username: string, accessToken?: string): Promise<KeycloakUser> {
    const token = accessToken ?? this.httpRequest.headers["authorization"];
    const url = `http://${this.keycloakHost}:${this.keycloakPort}/auth/admin/realms/${this.keycloakRealm}/users?username=${username}`;
    try {
      const response = await lastValueFrom(this.httpService.get(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }));
      return response.data[0];
    } catch (e) {
      this.logger.error(e.message);
      throw new UnauthorizedException("Invalid credentials");
    }
  }

  async getUserById(authToken: string, id: string) {
    const URL = `http://${this.keycloakHost}:${this.keycloakPort}/auth/admin/realms/${this.keycloakRealm}/users/${id}`;
    try {
      return await this.httpService.get(URL, {
        headers: {
          "Authorization": authToken
        }
      }).pipe(map(e => e.data));
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  createKeycloakUser(header: any, user): Promise<any> {
    try {
      return Promise.resolve();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);

    }
  }

  resetKeycloakUserById(req, id, rawPasswword: string): Promise<void> {
    try {
      return Promise.resolve();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }

  }

  signOutKeycloakUser(header: any, id: string): Promise<void> {
    try {
      return Promise.resolve();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }

  }

  refreshAccessToken(accessToken): Promise<any> {
    try {
      return Promise.resolve();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }


  async getUserInfo(accessToken: string): Promise<KeycloakUserInfoDTO> {
    if (!accessToken.includes("Bearer")) {
      accessToken = `Bearer ${accessToken}`;
    }
    try {
      const URL = `http://${this.keycloakHost}:${this.keycloakPort}/auth/realms/${this.keycloakRealm}/protocol/openid-connect/userinfo`;
      return await lastValueFrom(this.httpService.get(URL, {
          headers: {
            "Authorization": `${accessToken}`
          }
        }
      ).pipe(map(e => e.data)));
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async changePasswordByKeycloakId(keycloakId: string, password: string): Promise<void> {
    try {
      const { access_token } = await this.signInToKeycloak(this.masterUsername, this.masterPassword);
      const URL = `http://${this.keycloakHost}:${this.keycloakPort}/auth/admin/realms/${this.keycloakRealm}/users/${keycloakId}/reset-password`;
      return await lastValueFrom(this.httpService.put(URL, {
          value: password
        }, {
          headers: {
            "Authorization": `Bearer ${access_token}`
          }
        }
      ).pipe(map(e => e.data)));
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
