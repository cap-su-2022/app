import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {catchError, lastValueFrom, map, Observable} from "rxjs";
import {KEYCLOAK_CONFIG} from "../constants/config/keycloak.config";
import {APPLICATION_X_WWW_FORM_URLENCODED} from "../constants/network/mediatype.constant";

@Injectable()
export class KeycloakService {

  static URI = `${KEYCLOAK_CONFIG.host}:${KEYCLOAK_CONFIG.port}/auth/realms/${KEYCLOAK_CONFIG.client.realm}/protocol/openid-connect/token`

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

  async signInToKeycloak(username: string, password: string) {
    try {
      const response = await lastValueFrom(this.httpService.post(KeycloakService.URI, new URLSearchParams({
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
      return response.data;
    } catch (e) {
      console.log(e);
      return e.response.data;
    }
  }

  getUserById(authToken: string, id: string) {
    const USER_BY_ID_URI = "http://localhost:9090/auth/admin/realms/authentication/users/" + id;
    return this.httpService.get(USER_BY_ID_URI, {
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
}
