import {EntityRepository, Repository} from "typeorm";
import {Users} from "../models/users.entity";

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {

  findKeycloakIdByGoogleId(googleId: string): Promise<{keycloak_id: string}> {
    return this.createQueryBuilder("users")
      .select("users.keycloak_id")
      .where("users.google_id = :googleId", {googleId: googleId})
      .getRawOne();
  }

  async checkIfUserAlreadyHasAvatar(id: string): Promise<boolean> {
    const data = await this.createQueryBuilder("users")
      .select("COUNT(users.avatar)")
      .where("users.id = :id", {id: id})
      .getRawOne<Array<object>>();
    return data.length > 0;
  }

  addAvatarURLById(avatarUrl: string, id: string) {
    return this.createQueryBuilder("users")
      .update()
      .set({
        avatar: avatarUrl
      })
      .where("users.id = :id", {id: id})
      .useTransaction(true)
      .execute();
  }

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

  addNewLoginUser(payload: {}) {
    
  }
}
