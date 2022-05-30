import {EntityRepository, Repository} from "typeorm";
import {Accounts} from "../models/account.entity";

@EntityRepository(Accounts)
export class AccountRepository extends Repository<Accounts> {

  findKeycloakIdByGoogleId(googleId: string): Promise<{keycloak_id: string}> {
    return this.createQueryBuilder("accounts")
      .select("accounts.keycloak_id")
      .where("accounts.google_id = :googleId", {googleId: googleId})
      .getRawOne();
  }

  async checkIfUserAlreadyHasAvatar(id: string): Promise<boolean> {
    const data = await this.createQueryBuilder("accounts")
      .select("COUNT(accounts.avatar)")
      .where("accounts.id = :id", {id: id})
      .getRawOne<Array<object>>();
    return data.length > 0;
  }

  addAvatarURLById(avatarUrl: string, id: string) {
    return this.createQueryBuilder("accounts")
      .update()
      .set({
        avatar: avatarUrl
      })
      .where("accounts.id = :id", {id: id})
      .useTransaction(true)
      .execute();
  }

  findByGoogleId(googleId: string): Promise<Accounts> {
    return this.createQueryBuilder("accounts")
      .where("accounts.googleId = :googleId", {googleId})
      .getOne();
  }

  findByKeycloakId(keycloakId: string): Promise<Accounts> {
    return this.createQueryBuilder("accounts")
      .select(['accounts.id', 'accounts.keycloak_id', 'accounts.google_id',
        'accounts.username', 'accounts.email', 'accounts.fullname', 'accounts.phone'])
      .where("accounts.keycloak_id = :keycloakId", {keycloakId: keycloakId})
      .getOne();
  }

  addNewLoginUser(payload: {}) {

  }

  updateGoogleIdByEmail(userGoogleId: string, email: string) {
    return this.createQueryBuilder('accounts')
      .update({
        googleId: userGoogleId
      }).where('accounts.email = :email', {email: email})
      .useTransaction(true)
      .execute();
  }
}
