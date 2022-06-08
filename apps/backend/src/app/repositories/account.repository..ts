import { EntityRepository, InsertResult, Repository, UpdateResult } from "typeorm";
import { Accounts } from "../models/account.entity";

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
      .where("accounts.googleId = :googleId", { googleId })
      .andWhere("accounts.is_disabled = false")
      .andWhere("accounts.is_deleted = false")
      .getOneOrFail();
  }

  findByKeycloakId(keycloakId: string): Promise<Accounts> {
    return this.createQueryBuilder("accounts")
      .select(["accounts.id", "accounts.keycloak_id", "accounts.google_id",
        "accounts.username", "accounts.email", "accounts.fullname", "accounts.phone",
        "accounts.role", "accounts.avatar"])
      .where("accounts.keycloak_id = :keycloakId", { keycloakId: keycloakId })
      .andWhere("accounts.is_disabled = false")
      .andWhere("accounts.is_deleted = false")
      .getOneOrFail();
  }

  updateGoogleIdByEmail(userGoogleId: string, email: string) {
    return this.createQueryBuilder('accounts')
      .update({
        googleId: userGoogleId
      }).where('accounts.email = :email', {email: email})
      .useTransaction(true)
      .execute();
  }

  async getSize(): Promise<number> {
    const result = await this.createQueryBuilder(`accounts`)
      .select(`COUNT(id) as size`)
      .where(`accounts.is_disabled = false`)
      .andWhere(`accounts.is_deleted = false`)
      .getRawOne<{
        size: number
      }>();
    return result.size;
  }

  search(payload: { search: string; offset: number; limit: number; direction: string }): Promise<Accounts[]> {
    return this.createQueryBuilder(`accounts`)
      .where(`accounts.name LIKE :name`, {name: `%${payload.search}%`})
      .orWhere(`accounts.description LIKE :description`, {description: `%${payload.search}%`})
      .where(`accounts.is_disabled = false`)
      .andWhere(`accounts.is_deleted = false`)
      .orWhere(`accounts.username = :username`, {username: `%${payload.search}%`})
      .orWhere(`accounts.description = :description`, {description: `%${payload.search}%`})
      .skip(payload.offset)
      .take(payload.limit)
      .addOrderBy("id", payload.direction === "ASC" ? "ASC" : "DESC")
      .getMany();
  }

  findIdByKeycloakId(keycloakId: string): Promise<string> {
    return this.createQueryBuilder("accounts")
      .select("accounts.id", "accountId")
      .where("accounts.keycloak_id = :keycloakId", { keycloakId: keycloakId })
      .getRawOne().then((data) => data ? data["id"] : undefined);
  }

  findKeycloakIdByAccountId(id: string): Promise<string> {
    return this.createQueryBuilder("accounts")
      .select("accounts.keycloak_id as keycloak_id")
      .where("accounts.id = :id", { id: id })
      .getRawOne().then((data) => data ? data["keycloak_id"] : undefined);
  }

  async findAvatarURLById(keycloakId: string): Promise<string> {
    return this.createQueryBuilder("accounts")
      .select("accounts.avatar")
      .where("accounts.keycloak_id = :keycloakId", { keycloakId: keycloakId })
      .getRawOne().then((data) => data ? data["avatar"] : undefined);
  }

  restoreDisabledAccountById(id: string) {
    return this.createQueryBuilder("accounts")
      .update({
        isDisabled: false
      })
      .where("accounts.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  findDisabledAccounts(): Promise<Accounts[]> {
    return this.createQueryBuilder("accounts")
      .where("accounts.is_disabled = true")
      .andWhere("accounts.is_deleted = false")
      .getMany();
  }

  findDeletedAccounts(): Promise<Accounts[]> {
    return this.createQueryBuilder("accounts")
      .where("accounts.is_deleted = true")
      .getMany();
  }

  async restoreAccountById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("accounts")
      .update({
        isDeleted: false
      })
      .where("accounts.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  disableAccountById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("devices")
      .update({
        isDisabled: true
      })
      .where("accounts.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  findById(id: string): Promise<Accounts> {
    return this.findOneOrFail({
      where: {
        id: id
      }
    });
  }

  updatePartially(body: any, account: Accounts): Promise<Accounts> {
    return this.save(
      {
        ...body,
        ...account
      },
      {
        transaction: true
      }
    );
  }

  findRoleByKeycloakId(keycloakId: string): Promise<string> {
    return this.createQueryBuilder("accounts")
      .select("role")
      .where("accounts.keycloak_id = :keycloakId", { keycloakId: keycloakId })
      .getRawOne().then((data) => data ? data["role"] : undefined);
  }
}
