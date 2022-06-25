import { Repository, UpdateResult } from "typeorm";
import { Accounts } from "../models";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";
import { RepositoryPaginationPayload } from "../models/search-pagination.payload";

@CustomRepository(Accounts)
export class AccountRepository extends Repository<Accounts> {

  findKeycloakIdByGoogleId(googleId: string): Promise<string> {
    return this.createQueryBuilder("accounts")
      .select("accounts.keycloak_id", 'keycloakId')
      .where("accounts.google_id = :googleId", { googleId: googleId })
      .getRawOne().then((data) => data?.keycloakId);
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
      .andWhere("accounts.disabled_at IS NULL")
      .andWhere("accounts.deleted_at IS NULL")
      .getOneOrFail();
  }

  findByKeycloakId(keycloakId: string): Promise<Accounts> {
    return this.createQueryBuilder("accounts")
      .select(["accounts.id", "accounts.keycloak_id", "accounts.google_id",
        "accounts.username", "accounts.email", "accounts.fullname", "accounts.phone",
        "accounts.role", "accounts.avatar"])
      .where("accounts.keycloak_id = :keycloakId", { keycloakId: keycloakId })
      .andWhere("accounts.disabled_at IS NULL")
      .andWhere("accounts.deleted_at IS NULL")
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
      .andWhere("accounts.disabled_at IS NULL")
      .andWhere("accounts.deleted_at IS NULL")
      .getRawOne<{
        size: number
      }>();
    return result.size;
  }

  search(payload: RepositoryPaginationPayload): Promise<Accounts[]> {
    return this.createQueryBuilder(`accounts`)
      .where(`accounts.name LIKE :name`, { name: `%${payload.search}%` })
      .orWhere(`accounts.description LIKE :description`, { description: `%${payload.search}%` })
      .andWhere("accounts.disabled_at IS NULL")
      .andWhere("accounts.deleted_at IS NULL")
      .orWhere(`accounts.username = :username`, { username: `%${payload.search}%` })
      .orWhere(`accounts.description = :description`, { description: `%${payload.search}%` })
      .skip(payload.offset)
      .take(payload.limit)
      .getMany();
  }

  findIdByKeycloakId(keycloakId: string): Promise<string> {
    return this.createQueryBuilder("accounts")
      .select("accounts.id", "id")
      .where("accounts.keycloak_id = :keycloakId", { keycloakId: keycloakId })
      .getRawOne().then((data) => data ? data["id"] : undefined);
  }

  findKeycloakIdByAccountId(id: string): Promise<string> {
    return this.createQueryBuilder("accounts")
      .select("accounts.keycloak_id as keycloak_id")
      .where("accounts.id = :id", { id: id })
      .getRawOne().then((data) => data ? data["keycloak_id"] : undefined);
  }

  async findAvatarURLById(id: string): Promise<string> {
    return this.createQueryBuilder("accounts")
      .select("accounts.avatar", "avatar")
      .where("accounts.id = :id", { id: id })
      .getRawOne().then((data) => data ? data["avatar"] : undefined);
  }

  restoreDisabledAccountById(id: string) {
    return this.createQueryBuilder("accounts")
      .update({
        disabledBy: null,
        disabledAt: null
      })
      .where("accounts.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  findDisabledAccounts(): Promise<Accounts[]> {
    return this.createQueryBuilder("accounts")
      .andWhere("accounts.disabled_at IS NOT NULL")
      .andWhere("accounts.deleted_at IS NULL")
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
        deletedAt: null,
        deletedBy: null,
      })
      .where("accounts.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  disableAccountById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("devices")
      .update({
        disabledAt: new Date(),
        disabledBy: ''
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

  async findProfileInformationById(keycloakId: string) {
    return this.createQueryBuilder("a")
      .select(["a.id", "a.username", "a.email", "a.description", "a.phone",
        "a.effdate", "a.updated_at", "a.role", "a.fullname", "a.avatar"])
      .where("a.keycloak_id = :keycloakId", { keycloakId })
      .andWhere("accounts.disabled_at IS NULL")
      .andWhere("accounts.deleted_at IS NULL")
      .getOneOrFail();
  }

  async findUsernameById(id: string): Promise<string> {
    return this.createQueryBuilder("accounts")
      .select("accounts.username as username")
      .where("accounts.id = :id", { id })
      .getRawOne().then((data) => data["username"]);
  }

  findUsername(): Promise<string[]> {
    return this.createQueryBuilder("accounts")
      .select("accounts.username", "username")
      .andWhere("accounts.disabled_at IS NULL")
      .andWhere("accounts.deleted_at IS NULL")
      .getRawMany<{ username: string }>()
      .then((data) => data.map((acc) => acc.username));
  }

  existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('accounts')
      .select('COUNT(1)', 'count')
      .where("accounts.id = :id", {id: id})
      .getRawOne().then((data) => data['count'] > 0);
  }
}
