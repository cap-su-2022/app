import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Accounts } from "../models/account.entity";
import { BaseService } from "./base.service";
import { UpdateDeviceRequest, UsersDTO } from "@app/models";
import { AccountRepository } from "../repositories/account.repository.";
import { KeycloakService } from "./keycloak.service";
import { UsersRequestPayload } from "../payload/request/users.payload";
import { RoomsResponsePayload } from "../payload/response/rooms.payload";
import { Express } from "express";
import { KeycloakUserInfoDTO } from "../dto/keycloak-user-info.dto";
import { CloudinaryService } from "./cloudinary.service";


type File = Express.Multer.File;

@Injectable()
export class AccountsService extends BaseService<UsersDTO, Accounts, string> {
  private readonly logger = new Logger(AccountsService.name);

  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly keycloakService: KeycloakService,
    private readonly repository: AccountRepository
  ) {
    super();
  }

  getAll(): Promise<Accounts[]> {
    return null;
  }

  getUserIdByKeycloakId(keycloakId: string): Promise<string> {
    return this.repository.findIdByKeycloakId(keycloakId);
  }

  findByKeycloakId(keycloakId: string): Promise<Accounts> {
    return this.repository.findByKeycloakId(keycloakId);
  }

  async add(model: UsersDTO): Promise<Accounts> {
    try {
      const entity: Partial<Accounts> = {
        ...model
      };
      return this.repository.save(entity);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Error while adding new account");
    }
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

  async updateById(body: UpdateDeviceRequest, id: string): Promise<Accounts> {

    try {
      const account = await this.repository.findById(id);
      return await this.repository.updatePartially(body, account);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException("Account does not exist");
    }

  }

  async getById(id: string): Promise<Accounts> {
    try {
      return await this.repository.findById(id);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException("Account does not exist");
    }
  }

  async disableById(id: string): Promise<void> {
    try {
      await this.repository.disableAccountById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Error while disabling account");
    }
  }

  async handleRestoreDisabledAccountById(id: string) {
    try {
      return await this.repository.restoreDisabledAccountById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Error while restoring disabled account");
    }
  }

  async handleRestoreAccountById(id: string): Promise<void> {
    try {

      await this.repository.restoreAccountById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Error while getting deleted accounts");
    }
  }

  async getDeletedAccounts(): Promise<Accounts[]> {
    try {
      return await this.repository.findDeletedAccounts();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Error while getting deleted accounts");
    }
  }

  async getDisabledAccounts(): Promise<Accounts[]> {
    try {
      return await this.repository.findDisabledAccounts();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Error while getting disabled accounts");
    }
  }

  syncUsersFromKeycloak(): Promise<any> {
    return Promise.resolve();

  }

  async uploadAvatarByAccountId(image: File, id: string): Promise<void> {
    try {
      await this.repository.findById(id);
      await this.cloudinaryService.uploadImageAndGetURL(image.buffer, id);
      const url = await this.cloudinaryService.getImageURLByFileName(id);
      await this.repository.addAvatarURLById(url, id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Error while uploading avatar");
    }
  }

  getAccountByKeycloakId(id: string) {
    return this.repository.findOneOrFail({
      where: {
        keycloakId: id
      }
    }).catch((e) => {
      this.logger.error(e.message);
      throw new BadRequestException("Error while retrieving account");
    });
  }

  getAccountRoleByKeycloakId(keycloakId: string): Promise<string> {
    try {
      return this.repository.findRoleByKeycloakId(keycloakId);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async changePassword(keycloakUser: KeycloakUserInfoDTO, password: string): Promise<void> {
    try {
      await this.keycloakService.changePasswordByKeycloakId(keycloakUser.sub, password);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException("Error while changing account password");
    }
  }

  async updateMyProfile(keycloakUser: KeycloakUserInfoDTO,
                        payload: { fullname: string; phone: string; description: string }):
    Promise<Accounts> {
    try {
      const user = await this.repository.findByKeycloakId(keycloakUser.sub);
      if (!user) {
        throw new BadRequestException("Account does not exist with the provided id");
      }

      return await this.repository.save({
        ...user,
        ...payload
      });

    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Error while update your profile.");
    }
  }

  async changePasswordByKeycloakId(id: string, password: string) {
    try {
      const keycloakId = await this.repository.findKeycloakIdByAccountId(id);
      await this.keycloakService.changePasswordByKeycloakId(keycloakId, password);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Error while changing password by keycloak id");
    }

  }

  async getAvatarURLByKeycloakId(keycloakId: string): Promise<string> {
    return await this.repository.findAvatarURLById(keycloakId);
  }

  async getCurrentProfileInformation(keycloakId: string): Promise<Accounts> {
    try {
      return await this.repository.findProfileInformationById(keycloakId);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
