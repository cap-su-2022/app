import {EntityRepository, Repository} from "typeorm";
import {Users} from "../models/users.entity";

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {

  findByGoogleId(googleId: string): Promise<Users> {
    return this.createQueryBuilder("users")
      .where("users.googleId = :googleId", {googleId})
      .getOne();
  }

  findByKeycloakId(keycloakId: string): Promise<Users> {
    return this.createQueryBuilder("users")
      .select(['users.id', 'users.keycloak_id', 'users.google_id',
        'users.username', 'users.email', 'users.fullname', 'users.phone'])
      .where("users.keycloak_id = :keycloakId", {keycloakId: keycloakId})
      .getOne();
  }
}
