import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import {Accounts} from '../models';
import {BaseService} from './base.service';
import {UpdateDeviceRequest, UsersDTO} from '@app/models';
import {AccountRepository} from '../repositories';
import {KeycloakService} from './keycloak.service';
import {UsersRequestPayload} from '../payload/request/users.payload';
import {CloudinaryService} from './cloudinary.service';
import {AccountsResponsePayload} from '../payload/response/accounts.payload';
import {KeycloakUserInstance} from '../dto/keycloak.user';
import {Direction} from '../models/search-pagination.payload';
import {ChangeProfilePasswordRequest} from '../payload/request/change-password.request.payload';
import {randomUUID} from 'crypto';
import {AccountsPaginationParams} from '../controllers/accounts-pagination.model';
import {AccountHistService} from './account-hist.service';
import {AccountAddRequestPayload} from '../payload/request/account-add.request.payload';
import {AccountUpdateProfilePayload} from '../payload/request/account-update-profile.request.payload';

@Injectable()
export class AccountsService {
  private readonly logger = new Logger(AccountsService.name);

  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly keycloakService: KeycloakService,
    private readonly repository: AccountRepository,
    private readonly histService: AccountHistService
  ) {
  }

  async getAll(request: AccountsPaginationParams) {
    try {
      return await this.repository.searchAccount(request);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('One or more parameters is invalid');
    }
  }

  async getUserNames() {
    try {
      return await this.repository.findUserNames();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getRoleOfAccount(id: string) {
    try {
      const role = await this.repository.getRoleOfAccount(id);
      return role;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('One or more parameters is invalid');
    }
  }

  async getById(id: string): Promise<Accounts> {
    try {
      const account = await this.repository.findById(id);
      return account;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Account does not exist');
    }
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

  async getAccountsByRoleId(roleId: string): Promise<Accounts[]> {
    try {
      return await this.repository.getAccountsByRoleId(roleId);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'An error occurred while getting accounts by type ' + roleId
      );
    }
  }

  async add(
    payload: AccountAddRequestPayload,
    userId: string
  ): Promise<Accounts> {
    const isExisted = await this.repository.isExistedByUsername(
      payload.username
    );
    if (isExisted) {
      throw new BadRequestException('Username is duplicated!');
    }
    try {
      const accountAdded = await this.repository.createNewAccount(
        payload,
        userId
      );
      await this.histService.createNew(accountAdded);
      return accountAdded;
    } catch (e) {
      this.logger.error(e.message);
      if (
        e.message.includes('constraint') &&
        e.message.includes('devices_device_type_id_fk')
      ) {
        throw new BadRequestException(
          'There is no device type with the provided id'
        );
      }
      throw new BadRequestException('Error while creating a new device');
    }
  }

  addAll(models: UsersDTO[]): Promise<Accounts[]> {
    return Promise.resolve([]);
  }

  async updateById(
    accountId: string,
    id: string,
    body: AccountUpdateProfilePayload
  ) {
    let account;
    try {
      account = await this.repository.findOneOrFail({
        where: {
          id: id,
        },
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        e.message ?? 'Error while update updating account ID'
      );
    }

    const data = await this.repository.findById(id);
    if (data === undefined) {
      throw new BadRequestException(
        'This account is already deleted or disabled'
      );
    }

    try {
      const accountUpdated = await this.repository.updatePartially(
        body,
        account,
        accountId
      );
      await this.histService.createNew(accountUpdated);
      return accountUpdated;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'Error occurred while updating this account'
      );
    }
  }

  async disableById(accountId: string, id: string): Promise<any> {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Account does not found with the provided id'
        );
      }
      const isDisabled = await this.repository.checkIfAccountIsDisabledById(id);
      if (isDisabled) {
        throw new BadRequestException('This account is already disabled');
      }
      const isDeleted = await this.repository.checkIfAccountIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException(
          'This account is already deleted, can not disable'
        );
      }
      const account = await this.repository.disableById(accountId, id);
      await this.histService.createNew(account);
      return account;
    } catch (e) {
      throw new BadRequestException(
        e.message ?? 'Error occurred while disable this account'
      );
    }
  }

  async getDisabledAccounts(search: string): Promise<Accounts[]> {
    try {
      return await this.repository.findDisabledAccounts(search);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while getting disabled accounts');
    }
  }

  async handleRestoreDisabledAccountById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Account does not found with the provided id'
        );
      }
      const isDeleted = await this.repository.checkIfAccountIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('This account is already deleted');
      }
      const isDisabled = await this.repository.checkIfAccountIsDisabledById(id);
      if (!isDisabled) {
        throw new BadRequestException(
          'This account ID is now active. Cannot restore it'
        );
      }
      const account = await this.repository.restoreDisabledAccountById(
        accountId,
        id
      );
      await this.histService.createNew(account);
      return account;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ??
        'Error occurred while restore the disabled status of this account'
      );
    }
  }

  async deleteById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Account does not found with the provided id'
        );
      }

      if (accountId === id) {
        throw new BadRequestException("You can't delete yourself");
      }

      const userDelete = await this.repository.getRoleOfAccount(accountId);
      const userBeDeleted = await this.repository.getRoleOfAccount(id);

      if (userDelete?.role_name === userBeDeleted?.role_name) {
        throw new BadRequestException(
          "You can't delete user have same role with you"
        );
      }
      const isDeleted = await this.repository.checkIfAccountIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('This account is already deleted');
      }
      const account = await this.repository.deleteById(accountId, id);
      await this.histService.createNew(account);
      return account;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getDeletedAccounts(search: string): Promise<Accounts[]> {
    try {
      return await this.repository.findDeletedAccounts(search);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while getting deleted accounts');
    }
  }

  async handleRestoreDeletedAccountById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Account does not found with the provided id'
        );
      }
      const isDisabled = await this.repository.checkIfAccountIsDisabledById(id);
      if (isDisabled) {
        throw new BadRequestException('This account is already disabled');
      }
      const isDeleted = await this.repository.checkIfAccountIsDeletedById(id);
      if (!isDeleted) {
        throw new BadRequestException(
          'This account ID is now active. Cannot restore it'
        );
      }

      const account = await this.repository.restoreDeletedAccountById(
        accountId,
        id
      );
      await this.histService.createNew(account);
      return account;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
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
      const isDisabled = await this.repository.checkIfAccountIsDisabledById(id);
      const isDeleted = await this.repository.checkIfAccountIsDeletedById(id);
      if (isDisabled || isDeleted) {
        throw new BadRequestException('This account has been disabled or deleted');
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

  // async getUsernameByAccountId(id: string): Promise<string> {
  //   try {
  //     return await this.repository.findUsernameById(id);
  //   } catch (e) {
  //     this.logger.error(e);
  //     throw new BadRequestException(e.message);
  //   }
  // }

  async updateMyProfile(
    keycloakUser: KeycloakUserInstance,
    body: AccountUpdateProfilePayload
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
        ...body,
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

  async getAccountRoleById(id: string) {
    try {
      return await this.repository.findRoleNameById(id);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }
}
