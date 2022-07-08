import { Repository, UpdateResult } from 'typeorm';
import { Accounts } from '../models';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { RepositoryPaginationPayload } from '../models/search-pagination.payload';
import {
  IPaginationMeta,
  paginateRaw,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Roles } from '../models/role.entity';
import { AccountsPaginationParams } from '../controllers/accounts-pagination.model';

@CustomRepository(Accounts)
export class AccountRepository extends Repository<Accounts> {

  async checkIfAccountIsDeletedById(id: string): Promise<boolean> {
    return this.createQueryBuilder('accounts')
      .select('accounts.deleted_at')
      .where('accounts.id = :id', { id: id })
      .getRawOne<boolean>()
      .then((data) => (data ? data['deleted_at'] : true));
  }

  findKeycloakIdByGoogleId(googleId: string): Promise<string> {
    return this.createQueryBuilder('accounts')
      .select('accounts.keycloak_id', 'keycloakId')
      .where('accounts.google_id = :googleId', { googleId: googleId })
      .getRawOne()
      .then((data) => data?.keycloakId);
  }

  async checkIfUserAlreadyHasAvatar(id: string): Promise<boolean> {
    const data = await this.createQueryBuilder('accounts')
      .select('COUNT(accounts.avatar)')
      .where('accounts.id = :id', { id: id })
      .getRawOne<Array<object>>();
    return data.length > 0;
  }

  addAvatarURLById(avatarUrl: string, id: string) {
    return this.createQueryBuilder('accounts')
      .update()
      .set({
        avatar: avatarUrl,
      })
      .where('accounts.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  findByGoogleId(googleId: string): Promise<Accounts> {
    return this.createQueryBuilder('accounts')
      .where('accounts.googleId = :googleId', { googleId })
      .andWhere('accounts.disabled_at IS NULL')
      .andWhere('accounts.deleted_at IS NULL')
      .getOneOrFail();
  }

  searchAccount(payload: AccountsPaginationParams) {
    const query = this.createQueryBuilder('account')
      .select('account.id', 'id')
      .addSelect('account.username', 'username')
      .addSelect('account.description', 'description')
      .addSelect('account.fullname', 'fullname')
      .addSelect('account.createdAt', 'createdAt')
      .addSelect('account.updatedAt', 'updatedAt')
      .addSelect('account.email', 'email')
      .addSelect('role.name', 'role')
      .addSelect('a.username', 'createdBy')
      .addSelect('aa.username', 'updatedBy')
      .leftJoin(Accounts, 'a', 'a.id = account.created_by')
      .leftJoin(Accounts, 'aa', 'aa.id = account.updated_by')
      .innerJoin(Roles, 'role', 'role.id = account.role_id')
      .where('LOWER(account.fullname) ILIKE LOWER(:search)', {
        search: `%${payload.search.trim()}%`,
      })
      .andWhere('account.deleted_at IS NULL')
      .andWhere('account.disabled_at IS NULL')
      .orderBy(payload.sort, payload.dir as 'ASC' | 'DESC');
    if (payload.role && payload.role !== '') {
      query.andWhere('role.name = :role', {
        role: payload.role,
      });
    }
    return paginateRaw<Accounts>(query, {
      limit: payload.limit,
      page: payload.page,
    });
  }

  findByKeycloakId(keycloakId: string): Promise<Accounts> {
    return this.createQueryBuilder('accounts')
      .select([
        'accounts.id',
        'accounts.keycloak_id',
        'accounts.google_id',
        'accounts.username',
        'accounts.email',
        'accounts.fullname',
        'accounts.phone',
        'accounts.avatar',
      ])
      .addSelect('r.name', 'role')
      .innerJoin(Roles, 'r', 'r.id = accounts.role_id')
      .where('accounts.keycloak_id = :keycloakId', { keycloakId: keycloakId })
      .andWhere('accounts.disabled_at IS NULL')
      .andWhere('accounts.deleted_at IS NULL')
      .getOneOrFail();
  }

  updateGoogleIdByEmail(userGoogleId: string, email: string) {
    return this.createQueryBuilder('accounts')
      .update({
        googleId: userGoogleId,
      })
      .where('accounts.email = :email', { email: email })
      .useTransaction(true)
      .execute();
  }

  getAccountsByRoleId(roleId: string) {
    return this.createQueryBuilder(`account`)
      .select('account.id', 'id')
      .addSelect('account.username', 'username')
      .addSelect('account.fullname', 'fullname')
      .addSelect('account.role_id', 'roleId')
      .addSelect('r.name', 'roleName')
      .innerJoin(Roles, 'r', 'r.id = account.role_id')
      .where(`account.deleted_at IS NULL`)
      .andWhere(`account.disabled_at IS NULL`)
      .andWhere('account.role_id = :role', { role: roleId })

      .getRawMany<Accounts>();
  }

  async getSize(): Promise<number> {
    const result = await this.createQueryBuilder(`accounts`)
      .select(`COUNT(id)`, 'size')
      .andWhere('accounts.disabled_at IS NULL')
      .andWhere('accounts.deleted_at IS NULL')
      .getRawOne<{
        size: number;
      }>();
    return result.size;
  }

  search(
    payload: RepositoryPaginationPayload
  ): Promise<Pagination<Accounts, IPaginationMeta>> {
    const query = this.createQueryBuilder(`accounts`)
      .where(`accounts.name LIKE :name`, { name: `%${payload.search}%` })
      .orWhere(`accounts.description LIKE :description`, {
        description: `%${payload.search}%`,
      })
      .andWhere('accounts.disabled_at IS NULL')
      .andWhere('accounts.deleted_at IS NULL')
      .orWhere(`accounts.username = :username`, {
        username: `%${payload.search}%`,
      })
      .orWhere(`accounts.description = :description`, {
        description: `%${payload.search}%`,
      });
    return paginateRaw<Accounts>(query, {
      page: payload.page,
      limit: payload.limit,
    });
  }

  findIdByKeycloakId(keycloakId: string): Promise<string> {
    return this.createQueryBuilder('accounts')
      .select('accounts.id', 'id')
      .where('accounts.keycloak_id = :keycloakId', { keycloakId: keycloakId })
      .getRawOne()
      .then((data) => (data ? data['id'] : undefined));
  }

  findKeycloakIdByAccountId(id: string): Promise<string> {
    return this.createQueryBuilder('accounts')
      .select('accounts.keycloak_id', 'keycloak_id')
      .where('accounts.id = :id', { id: id })
      .getRawOne()
      .then((data) => (data ? data['keycloak_id'] : undefined));
  }

  async findAvatarURLById(id: string): Promise<string> {
    return this.createQueryBuilder('accounts')
      .select('accounts.avatar', 'avatar')
      .where('accounts.id = :id', { id: id })
      .getRawOne()
      .then((data) => (data ? data['avatar'] : undefined));
  }

  restoreDisabledAccountById(id: string) {
    return this.createQueryBuilder('accounts')
      .update({
        disabledBy: null,
        disabledAt: null,
      })
      .where('accounts.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  findDisabledAccounts(): Promise<Accounts[]> {
    return this.createQueryBuilder('accounts')
      .andWhere('accounts.disabled_at IS NOT NULL')
      .andWhere('accounts.deleted_at IS NULL')
      .getMany();
  }

  findDeletedAccounts(): Promise<Accounts[]> {
    return this.createQueryBuilder('accounts')
      .where('accounts.deleted_at IS NOT NULL')
      .getMany();
  }

  async restoreAccountById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('accounts')
      .update({
        deletedAt: null,
        deletedBy: null,
      })
      .where('accounts.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  disableAccountById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('accounts')
      .update({
        disabledAt: new Date(),
        disabledBy: '',
      })
      .where('accounts.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  async findById(id: string): Promise<Accounts> {
    return this.createQueryBuilder('account')
      .select('account.id', 'id')
      .addSelect('account.username', 'username')
      .addSelect('account.description', 'description')
      .addSelect('account.fullname', 'fullname')
      .addSelect('account.createdAt', 'createdAt')
      .addSelect('account.updatedAt', 'updatedAt')
      .addSelect('account.role_id', 'roleId')
      .addSelect('account.email', 'email')
      .addSelect('role.name', 'role')
      .addSelect('a.username', 'createdBy')
      .addSelect('aa.username', 'updatedBy')
      .leftJoin(Accounts, 'a', 'a.id = account.created_by')
      .leftJoin(Accounts, 'aa', 'aa.id = account.updated_by')
      .innerJoin(Roles, 'role', 'role.id = account.role_id')
      .where('account.disabled_at IS NULL')
      .andWhere('account.deleted_at IS NULL')
      .andWhere('account.id = :accountId', { accountId: id })
      .getRawOne<Accounts>();
  }

  updatePartially(body: any, account: Accounts, accountId: string): Promise<Accounts> {
    return this.save(
      {
        ...account,
        fullname: body.fullname,
        phone: body.phone,
        description: body.description,
        updatedBy: accountId,
        role: body.role,
      },
      {
        transaction: true,
      }
    );
  }

  findRoleByKeycloakId(keycloakId: string): Promise<string> {
    return this.createQueryBuilder('accounts')
      .select('r.name', 'role')
      .innerJoin(Roles, 'r', 'r.id = accounts.role_id')
      .where('accounts.keycloak_id = :keycloakId', { keycloakId: keycloakId })
      .getRawOne()
      .then((data) => data?.role);
  }

  async findProfileInformationById(keycloakId: string) {
    return this.createQueryBuilder('a')
      .select([
        'a.id',
        'a.username',
        'a.email',
        'a.description',
        'a.phone',
        'a.created_at',
        'a.updated_at',
        'a.fullname',
        'a.avatar',
      ])
      .addSelect('r.name', 'role')
      .innerJoin(Roles, 'r', 'a.role_id = r.id')
      .where('a.keycloak_id = :keycloakId', { keycloakId })
      .andWhere('a.disabled_at IS NULL')
      .andWhere('a.deleted_at IS NULL')
      .getOneOrFail();
  }

  async findUsernameById(id: string): Promise<string> {
    return this.createQueryBuilder('accounts')
      .select('accounts.username', 'username')
      .where('accounts.id = :id', { id })
      .getRawOne()
      .then((data) => data['username']);
  }

  findUsername(): Promise<string[]> {
    return this.createQueryBuilder('accounts')
      .select('accounts.username', 'username')
      .andWhere('accounts.disabled_at IS NULL')
      .andWhere('accounts.deleted_at IS NULL')
      .getRawMany<{ username: string }>()
      .then((data) => data.map((acc) => acc.username));
  }

  disableById(accountId: string, id: string) {
    return this.createQueryBuilder('accounts')
      .update({
        disabledBy: accountId,
        disabledAt: new Date(),
      })
      .where('accounts.id = :id', { id: id })
      .useTransaction(true)

      .execute();
  }

  existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('accounts')
      .select('COUNT(1)', 'count')
      .where('accounts.id = :id', { id: id })
      .getRawOne()
      .then((data) => data['count'] > 0);
  }
}
