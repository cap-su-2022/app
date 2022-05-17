import {HttpException, HttpStatus, Injectable, Logger} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {lastValueFrom, map, Observable} from "rxjs";
import {KEYCLOAK_CONFIG} from "../constants/config/keycloak.config";
import {APPLICATION_X_WWW_FORM_URLENCODED} from "../constants/network/mediatype.constant";
import {LazyModuleLoader} from "@nestjs/core";
import {KeycloakSigninResponse} from "../dto/keycloak-signin.response";
import {KeycloakSigninSuccessResponse} from "../dto/keycloak-signin-success.response.dto";
import {KeycloakSigninFailureResponse} from "../dto/keycloak-signin-failure.response.dto";



@Injectable()
export class KeycloakService {

  private static logger = new Logger(KeycloakService.name);

  static URI = `${KEYCLOAK_CONFIG.host}:${KEYCLOAK_CONFIG.port}/auth/realms/${KEYCLOAK_CONFIG.client.realm}/protocol/openid-connect`

  constructor(private readonly httpService: HttpService) {


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
    try {
      const response = await lastValueFrom(this.httpService.post(`${KeycloakService.URI}/token`, new URLSearchParams({
        client_id: KEYCLOAK_CONFIG.client.id,
        client_secret: KEYCLOAK_CONFIG.client.secret,
        grant_type: KEYCLOAK_CONFIG.grantType.password,
        username: username,
        password: password,
      }), {
        headers: {
          "Content-Type": APPLICATION_X_WWW_FORM_URLENCODED
        },
      }));
      return response.data as KeycloakSigninSuccessResponse;
    } catch (e) {
      KeycloakService.logger.error(e);
      throw new HttpException(e.response.data['error_description'], HttpStatus.UNAUTHORIZED);
    }
  }

  getUserById(authToken: string, id: string) {
    const URL = `${KEYCLOAK_CONFIG.host}:${KEYCLOAK_CONFIG.port}/auth/admin/realms/${KEYCLOAK_CONFIG.client.realm}/users/${id}`;
    console.log(URL);
    return this.httpService.get(URL, {
      headers: {
        "Authorization": authToken,
      }
    }).pipe(map(e => e.data));
  }

  createKeycloakUser(header: any, user) {

  }

  resetKeycloakUserById(req: Request, id, rawPasswword: any) {

  }

  signOutKeycloakUser(header: any, id: string) {

  }

  refreshAccessToken(accessToken) {

  }


  getUserInfo(accessToken: string): Promise<any> {
    const URL = `${KeycloakService.URI}/userinfo`;
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
