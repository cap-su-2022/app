import { UpdateAccountRequest } from './../../../../../libs/models/src/lib/request/update-account-request.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Accounts } from '../models';
import { BaseService } from './base.service';
import { UpdateDeviceRequest, UsersDTO } from '@app/models';
import { AccountRepository } from '../repositories';
import { KeycloakService } from './keycloak.service';
import { UsersRequestPayload } from '../payload/request/users.payload';
import { CloudinaryService } from './cloudinary.service';
import { AccountsResponsePayload } from '../payload/response/accounts.payload';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { Direction } from '../models/search-pagination.payload';
import { ChangeProfilePasswordRequest } from '../payload/request/change-password.request.payload';
import { randomUUID } from 'crypto';
import { AccountsPaginationParams } from '../controllers/accounts-pagination.model';
import { AccountHistService } from './account-hist.service';

@Injectable()
export class AccountsService{
  private readonly logger = new Logger(AccountsService.name);

  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly keycloakService: KeycloakService,
    private readonly repository: AccountRepository,
    private readonly histService: AccountHistService,
  ) {}

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
        ...model,
      };
      return this.repository.save(entity);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while adding new account');
    }
  }

  addAll(models: UsersDTO[]): Promise<Accounts[]> {
    return Promise.resolve([]);
  }

  async getAccountsByRoleId(roleId: string): Promise<Accounts[]> {
    try {
      return await this.repository.getAccountsByRoleId(roleId);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'An error occurred while getting rooms by type ' + roleId
      );
    }
  }

  deleteById(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  async getAll(request: AccountsPaginationParams) {
    try {
      return await this.repository.searchAccount(request);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('One or more parameters is invalid');
    }
  }

  async updateById(
    accountId: string,
    id: string,
    body: UpdateAccountRequest
  ) {
    let account;
    // if (
    //   body.fullname.length < 1 ||
    //   body.email.length < 1 ||
    //   body.description.length < 1
    // ) {
    //   throw new BadRequestException('Fields cannot be left blank!');
    // }
    try {
      account = await this.repository.findOneOrFail({
        where: {
          id: id,
        },
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Account doesn't exist with the provided id");
    }

    const data = await this.repository.findById(id);
    if (data === undefined) {
      throw new BadRequestException('This account is already deleted or disabled');
    }

    try {
      const accountAdded = await this.repository.updatePartially(body, account, accountId);
      await this.histService.createNew(accountAdded);
      return accountAdded;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'Error occurred while updating this room'
      );
    }
  }

  async getById(id: string): Promise<Accounts> {
    try {
      return await this.repository.findById(id);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Account does not exist');
    }
  }

  async disableById(accountId: string, id: string): Promise<any> {
    const data = await this.repository.findById(id);
    if (data === undefined) {
      throw new BadRequestException('This account is already deleted or disabled');
    }
    try {
      const result = await this.repository.disableById(accountId, id);
      if (result.affected < 1) {
        throw new BadRequestException(
          "Account doesn't exist with the provided id"
        );
      } else {
        const account = await this.repository.findOneOrFail({
          where: {
            id: id,
          },
        });
        await this.histService.createNew(account);
        return account;
      }
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'Error occurred while disabling this room'
      );
    }
  }

  async handleRestoreDisabledAccountById(id: string) {
    try {
      const account = await this.repository.findOneOrFail({
        where: {
          id: id,
        },
      });
      if (
        account.deletedBy == null &&
        account.deletedAt == null &&
        account.disabledBy == null &&
        account.disabledAt == null
      ) {
        throw new BadRequestException('This account is active!');
      }
      const isDeleted = await this.repository.checkIfAccountIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('Not found with provided id');
      }
      const result = await this.repository.restoreDisabledAccountById(id);
      if (result.affected < 1) {
        throw new BadRequestException(
          "Account doesn't exist with the provided id"
        );
      } else {
        const account = await this.repository.findOneOrFail({
          where: {
            id: id,
          },
        });;
        await this.histService.createNew(account);
        return account;
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while restoring disabled account');
    }
  }

  async handleRestoreAccountById(id: string): Promise<void> {
    try {
      await this.repository.restoreAccountById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while getting deleted accounts');
    }
  }

  async getDeletedAccounts(): Promise<Accounts[]> {
    try {
      return await this.repository.findDeletedAccounts();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while getting deleted accounts');
    }
  }

  async getDisabledAccounts(): Promise<Accounts[]> {
    try {
      return await this.repository.findDisabledAccounts();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while getting disabled accounts');
    }
  }

  syncUsersFromKeycloak(): Promise<any> {
    return Promise.resolve();
  }

  async uploadAvatarByAccountId(
    image: Express.Multer.File,
    id: string
  ): Promise<void> {
    try {
      console.log(image);
      const user = await this.repository.findById(id);
      if (!user.deletedAt || !user.disabledAt) {
        throw new BadRequestException('This account has been disabled');
      }
      const imageId = randomUUID();
      await this.cloudinaryService.uploadImageAndGetURL(image.buffer, imageId);
      const url = await this.cloudinaryService.getImageURLByFileName(imageId);
      await this.repository.addAvatarURLById(url, id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        e.message ?? 'Error while uploading avatar'
      );
    }
  }

  getAccountByKeycloakId(id: string) {
    return this.repository
      .findOneOrFail({
        where: {
          keycloakId: id,
        },
      })
      .catch((e) => {
        this.logger.error(e.message);
        throw new BadRequestException('Error while retrieving account');
      });
  }

  async getAccountRoleByKeycloakId(keycloakId: string): Promise<string> {
    try {
      return await this.repository.findRoleByKeycloakId(keycloakId);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async changePassword(
    keycloakUser: KeycloakUserInstance,
    payload: ChangeProfilePasswordRequest
  ): Promise<void> {
    try {
      if (payload.password === payload.newPassword) {
        throw new BadRequestException(
          'Old password must not be the same with new password.'
        );
      }
      await this.keycloakService.signInToKeycloak(
        payload.username,
        payload.password
      );
      await this.keycloakService.changePasswordByKeycloakId(
        keycloakUser.sub,
        payload.newPassword
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        e.message ?? 'Error while changing account password'
      );
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

  async updateMyProfile(
    keycloakUser: KeycloakUserInstance,
    payload: { fullname: string; phone: string; description: string }
  ): Promise<Accounts> {
    try {
      const user = await this.repository.findByKeycloakId(keycloakUser.sub);
      if (!user) {
        throw new BadRequestException(
          'Account does not exist with the provided id'
        );
      }

      return await this.repository.save({
        ...user,
        ...payload,
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while update your profile.');
    }
  }

  async changePasswordByKeycloakId(id: string, password: string) {
    try {
      const keycloakId = await this.repository.findKeycloakIdByAccountId(id);
      await this.keycloakService.changePasswordByKeycloakId(
        keycloakId,
        password
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        'Error while changing password by keycloak id'
      );
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

  async getKeycloakIdByGoogleId(googleId: string): Promise<string> {
    try {
      return await this.repository.findKeycloakIdByGoogleId(googleId);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getAccountByGoogleId(googleId: string): Promise<Accounts> {
    try {
      return await this.repository.findByGoogleId(googleId);
    } catch (e) {
      this.logger.error(e.emssage);
      throw new BadRequestException(e.message);
    }
  }

  async checkIfAccountAlreadyHasAvatarImage(
    accountId: string
  ): Promise<boolean> {
    try {
      const isExisted = this.repository.existsById(accountId);
      if (!isExisted) {
        throw new BadRequestException(
          'Account does not exists with the provided id'
        );
      }
      return await this.repository.checkIfUserAlreadyHasAvatar(accountId);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async addGoogleAvatarURLByAccountId(
    googleImageURL: string,
    accountId: string
  ): Promise<void> {
    try {
      const result = await this.repository.addAvatarURLById(
        googleImageURL,
        accountId
      );
      if (result.affected < 1) {
        throw new BadRequestException(
          'Error while updating account google image'
        );
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async updateGoogleIdByAccountEmail(
    googleId: string,
    email: string
  ): Promise<void> {
    try {
      const result = await this.repository.updateGoogleIdByEmail(
        googleId,
        email
      );
      if (result.affected < 1) {
        throw new HttpException(
          'Invalid account. Please contract to administrator for more information',
          HttpStatus.UNAUTHORIZED
        );
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getAccountIdByKeycloakId(keycloakId: string) {
    return this.repository.findIdByKeycloakId(keycloakId);
  }
}
