import {Connection, EntityRepository, Repository} from "typeorm";
import {Inject, Injectable} from "@nestjs/common";
import {TypeOrmConfigService} from "../constant/typeorm-config";

@Injectable()
export class KeycloakRepository {

  constructor(private readonly connection: Connection) {
  }

  async getKeycloakUsers() {
    return await this.connection.query(`SELECT u.ID as KEYCLOAK_ID, CONCAT(u.FIRST_NAME, CONCAT(' ', u.LAST_NAME)) AS FULLNAME,  r.NAME AS ROLE,
       u.EMAIL, u.EMAIL_VERIFIED, u.ENABLED AS IS_ENABLED, u.CREATED_TIMESTAMP AS CREATED_AT FROM USER_ENTITY u
           INNER JOIN USER_ROLE_MAPPING ur ON ur.USER_ID = u.ID
    INNER JOIN KEYCLOAK_ROLE r ON ur.ROLE_ID = r.ID WHERE r.REALM_ID = 'authentication' AND r.NAME != 'default-roles-authentication'`);
  }
}
