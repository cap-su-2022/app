import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Accounts } from "../models";
import { BaseService } from "./base.service";
import { UpdateDeviceRequest, UsersDTO } from "@app/models";
import { AccountRepository } from "../repositories";
import { KeycloakService } from "./keycloak.service";
import { UsersRequestPayload } from "../payload/request/users.payload";
import { CloudinaryService } from "./cloudinary.service";
import { AccountsResponsePayload } from "../payload/response/accounts.payload";
import { KeycloakUserInstance } from "../dto/keycloak.user";
import { Direction } from "../models/search-pagination.payload";
import { ChangeProfilePasswordRequest } from "../payload/request/change-password.request.payload";
import { randomUUID } from "crypto";

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
    try {
      return this.repository.findByKeycloakId(keycloakId);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
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
  ): Promise<AccountsResponsePayload> {
    const offset = request.size * (request.page - 1);
    const limit = request.size;

    let total = 0;
    let queryResult = [] as Accounts[];

    try {
      queryResult = await this.repository.search({
        search: request.search,
        offset: offset,
        limit: limit,
        direction: request.sort as Direction[]
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

  async uploadAvatarByAccountId(image: Express.Multer.File, id: string): Promise<void> {
    try {
      console.log(image);
      const user = await this.repository.findById(id);
      if (user.isDisabled || user.isDeleted) {
        throw new BadRequestException("This account has been disabled");
      }
      const imageId = randomUUID();
      await this.cloudinaryService.uploadImageAndGetURL(image.buffer, imageId);
      const url = await this.cloudinaryService.getImageURLByFileName(imageId);
      await this.repository.addAvatarURLById(url, id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message ?? "Error while uploading avatar");
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

  async changePassword(keycloakUser: KeycloakUserInstance, payload: ChangeProfilePasswordRequest): Promise<void> {
    try {
      if (payload.password === payload.newPassword) {
        throw new BadRequestException("Old password must not be the same with new password.");
      }
      await this.keycloakService.signInToKeycloak(payload.username, payload.password);
      await this.keycloakService.changePasswordByKeycloakId(keycloakUser.sub, payload.newPassword);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message ?? "Error while changing account password");
    }
  }

  async getUsernameByAccountId(id: string): Promise<string> {
    try {
      return await this.repository.findUsernameById(id);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async updateMyProfile(keycloakUser: KeycloakUserInstance,
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

  async getAvatarURLByAccountId(accountId: string): Promise<string> {
    return await this.repository.findAvatarURLById(accountId);
  }

  async getCurrentProfileInformation(keycloakId: string): Promise<Accounts> {
    try {
      return await this.repository.findProfileInformationById(keycloakId);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  getUsernameList(): Promise<string[]> {
    return this.repository.findUsername();
  }
}
