import {HttpException, HttpStatus, Inject, Injectable, Logger, Scope} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {lastValueFrom, map, Observable} from "rxjs";
import {KEYCLOAK_CONFIG} from "../constants/config/keycloak.config";
import {APPLICATION_X_WWW_FORM_URLENCODED} from "../constants/network/mediatype.constant";
import {KeycloakSigninSuccessResponse} from "../dto/keycloak-signin-success.response.dto";
import {KeycloakUser} from "@app/models";
import {ConfigService} from "@nestjs/config";
import {REQUEST} from "@nestjs/core";
import {Request} from "express";

@Injectable({
  scope: Scope.REQUEST
})
export class KeycloakService {

  private static logger = new Logger(KeycloakService.name);

  private readonly keycloakHost: string;
  private readonly keycloakPort: number;
  private readonly keycloakRealm: string;


  constructor(private readonly configService: ConfigService,
              private readonly httpService: HttpService,
              @Inject(REQUEST) private readonly httpRequest: Request) {
    this.keycloakHost = this.configService.get<string>("keycloak.host");
    this.keycloakPort = this.configService.get<number>("keycloak.port");
    this.keycloakRealm = this.configService.get<string>("keycloak.client.realm");
  }

  countUsers(token: string): Observable<number> {
    const COUNT_USERS_URI = "http://localhost:8080/auth/admin/realms/authentication/users/count";
    return this.httpService.get(COUNT_USERS_URI, {
      headers: {
        "Authorization": token,
      }
    }).pipe(map(e => e.data));
  }

  getAllUsers(token: string): Observable<number> {
    const USERS_URI = "http://localhost:9090/auth/admin/realms/authentication/users";
    return this.httpService.get(USERS_URI, {
      headers: {
        "Authorization": token,
      }
    }).pipe(map(e => e.data));
  }

  async signInToKeycloak(username: string, password: string): Promise<KeycloakSigninSuccessResponse> {
    const url = `http://${this.keycloakHost}:${this.keycloakPort}/auth/realms/${this.keycloakRealm}/protocol/openid-connect/token`;
    const signInPayload = new URLSearchParams({
      client_id: KEYCLOAK_CONFIG.client.id,
      client_secret: KEYCLOAK_CONFIG.client.secret,
      grant_type: KEYCLOAK_CONFIG.grantType.password,
      username: username,
      password: password,
    });
    try {
      const response = await lastValueFrom(this.httpService.post(url, signInPayload, {
        headers: {
          "Content-Type": APPLICATION_X_WWW_FORM_URLENCODED
        },
      }));
      return response.data as KeycloakSigninSuccessResponse;
    } catch (e) {
      console.log(e.response);
      KeycloakService.logger.error(e);
      throw new HttpException(e.response?.data['error_description'], HttpStatus.UNAUTHORIZED);
    }
  }

  async getUserByUsername(username: string, accessToken?: string): Promise<KeycloakUser> {
    const token = accessToken ?? this.httpRequest.headers['authorization'];
    const url = `http://${this.keycloakHost}:${this.keycloakPort}/auth/admin/realms/${this.keycloakRealm}/users?username=${username}`;
    const response = await lastValueFrom(this.httpService.get(url, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }));
    console.log(response);
    return response.data[0];
  }

  getUserById(authToken: string, id: string) {
    const URL = `http://${KEYCLOAK_CONFIG.host}:${KEYCLOAK_CONFIG.port}/auth/admin/realms/${KEYCLOAK_CONFIG.client.realm}/users/${id}`;
    console.log(URL);
    return this.httpService.get(URL, {
      headers: {
        "Authorization": authToken,
      }
    }).pipe(map(e => e.data));
  }

  createKeycloakUser(header: any, user) {

  }

  resetKeycloakUserById(req, id, rawPasswword: any) {

  }

  signOutKeycloakUser(header: any, id: string) {

  }

  refreshAccessToken(accessToken) {

  }


  getUserInfo(accessToken: string): Promise<any> {
    const URL = `http://${this.keycloakHost}:${this.keycloakPort}/auth/realms/${this.keycloakRealm}/protocol/openid-connect/userinfo`;
    console.log(URL);
    return lastValueFrom(this.httpService.get(URL, {
        headers: {
          "Authorization": accessToken,
        }
      }
    ).pipe(map(e => e.data))).catch((e) => {
      console.log(e.response.data);
      return e.response.data;
    });
  }

}
