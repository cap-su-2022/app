import {Injectable} from "@nestjs/common";
import {Accounts} from "../models/account.entity";
import {BaseService} from "./base.service";
import {UsersDTO} from "@app/models";
import {AccountRepository} from "../repositories/account.repository.";
import {KeycloakService} from "./keycloak.service";
import {UsersRequestPayload} from "../payload/request/users.payload";

@Injectable()
export class AccountsService extends BaseService<UsersDTO, Accounts, string>{

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly repository: AccountRepository) {
    super();
  }

  getAll(): Promise<Accounts[]> {
    return null;
  }

  findByKeycloakId(keycloakId: string): Promise<Accounts> {
    return this.repository.findByKeycloakId(keycloakId);
  }

  add(model: UsersDTO): Promise<Accounts> {
    return Promise.resolve(undefined);
  }

  addAll(models: UsersDTO[]): Promise<Accounts[]> {
    return Promise.resolve([]);
  }

  deleteById(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  async getAllByPagination(payload: UsersRequestPayload): Promise<Accounts[]> {
    return this.repository.find();
  }

  getById(id: string): Promise<Accounts> {
    return Promise.resolve(undefined);
  }

  updateById(model: UsersDTO, id: string): Promise<Accounts> {
    return Promise.resolve(undefined);
  }

  syncUsersFromKeycloak() {

  }
}
