import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {Accounts} from '../models/account.entity';
import {BaseService} from './base.service';
import {UpdateDeviceRequest, UsersDTO} from '@app/models';
import {AccountRepository} from '../repositories/account.repository.';
import {KeycloakService} from './keycloak.service';
import {UsersRequestPayload} from '../payload/request/users.payload';
import {RoomsResponsePayload} from '../payload/response/rooms.payload';
import {Devices} from '../models/devices';
import {NoSuchElementFoundException} from '../exception/no-such-element-found.exception';

@Injectable()
export class AccountsService extends BaseService<UsersDTO, Accounts, string> {
  private readonly logger = new Logger(AccountsService.name);

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly repository: AccountRepository
  ) {
    super();
  }

  getAll(): Promise<Accounts[]> {
    return null;
  }

  getUserIdByKeycloakId(keycloakId: string): Promise<{
    accountId: string
  }> {
    return this.repository.findIdByKeycloakId(keycloakId);
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

  async getAllByPagination(
    request: UsersRequestPayload
  ): Promise<RoomsResponsePayload> {
    const offset = request.size * (request.page - 1);
    const limit = request.size;

    let total = 0;
    let queryResult = [] as Accounts[];

    try {
      queryResult = await this.repository.search({
        search: request.search,
        offset: offset,
        limit: limit,
        direction: request.sort,
      });
      total = await this.repository.getSize();
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('One or more parameters are invalid');
    }

    const totalPage = Math.ceil(total / request.size);
    return {
      data: queryResult,
      currentPage: request.page,
      totalPage: totalPage,
      size: total,
    };
  }

  async updateById(body: UpdateDeviceRequest, id: string): Promise<Devices> {
    let device;

    try {
      device = await this.repository.findOneOrFail({
        where: {
          id: id,
        },
      });
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Account does not exist');
    }

    return this.repository.save(
      {
        ...device,
        ...body,
      },
      {
        transaction: true,
      }
    );
  }

  getById(id: string): Promise<Accounts> {
    try {
      return this.repository.findOneOrFail(id);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Account does not exist');
    }
  }

  disableById(id: string) {
    return this.repository
      .createQueryBuilder('devices')
      .update({
        isDisabled: true,
      })
      .where('accounts.id = :id', {id: id})
      .useTransaction(true)
      .execute();
  }

  handleRestoreDisabledAccountById(id: string) {
    return this.repository
      .createQueryBuilder('accounts')
      .update({
        isDisabled: false,
      })
      .where('accounts.id = :id', {id: id})
      .useTransaction(true)
      .execute();
  }

  handleRestoreAccountById(id: string) {
    return this.repository
      .createQueryBuilder('accounts')
      .update({
        isDeleted: false,
      })
      .where('accounts.id = :id', {id: id})
      .useTransaction(true)
      .execute();
  }

  getDeletedAccounts() {
    return this.repository
      .createQueryBuilder('accounts')
      .where('accounts.is_deleted = true')
      .getMany();
  }

  getDisabledAccounts() {
    return this.repository
      .createQueryBuilder('accounts')
      .where('accounts.is_disabled = true')
      .andWhere('accounts.is_deleted = false')
      .getMany();
  }

  syncUsersFromKeycloak(): Promise<any> {
    return Promise.resolve();
  }
}
