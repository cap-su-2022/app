import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PaginationParams } from '../controllers/pagination.model';
import { RolesRepository } from '../repositories/roles.repository';
import { MasterDataAddRequestPayload } from '../payload/request/master-data-add.request.payload';
import { Roles } from '../models/role.entity';
import { RoleHistService } from './role-hist.service';
import { AccountsService } from './accounts.service';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(
    private readonly repository: RolesRepository,
    private readonly accountService: AccountsService,
    private readonly histService: RoleHistService
  ) {}

  getRolesByPagination(payload: PaginationParams) {
    try {
      return this.repository.findByPagination(payload);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  getRoleNames() {
    try {
      return this.repository.findRoleName();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getRoleById(id: string) {
    try {
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException(
          'This role is already deleted or disabled'
        );
      }
      return data;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async addRole(
    body: { name: string; description: string },
    accountId: string
  ) {
    const role = await this.repository.addNew(accountId, body);
    await this.histService.createNew(role);
    return role;
  }

  async updateRoleById(
    accountId: string,
    payload: MasterDataAddRequestPayload,
    id: string
  ) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Role does not found with the provided id'
        );
      }
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException(
          'This device type is already deleted or disabled'
        );
      }
      const role = await this.repository.updateById(id, accountId, payload);
      await this.histService.createNew(role);
      return role;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async deleteRoleById(accountId: string, id: string) {
    try {
      const data = await this.repository.findById(id);
      const lisyAccountOfThisRole = await this.accountService.getAccountsByRoleId(id)
      if (data === undefined) {
        throw new BadRequestException(
          'This room is already deleted or disabled'
        );
      } else if (lisyAccountOfThisRole !== undefined && lisyAccountOfThisRole.length > 0) {
        throw new BadRequestException(
          'There are still account of this type, please change the type of those accounts before deleting role'
        );
      } else {
        const role = await this.repository.deleteById(accountId, id);
        await this.histService.createNew(role);
        return role;
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getDeletedRoles(search: string): Promise<Roles[]> {
    try {
      return await this.repository.getDeletedRoles(search);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while disabling this device');
    }
  }

  async handleRestoreDeletedRoleById(accountId: string, id: string) {
    try {
      const isExisted = this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Role does not exist with the provided id'
        );
      }
      const data = await this.repository.findById(id);
      if (data !== undefined) {
        throw new BadRequestException(
          'This Role ID is now active. Cannot restore it'
        );
      }
      const role = await this.repository.restoreDeletedById(accountId, id);
      await this.histService.createNew(role);
      return role;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'Error occurred while restore the delete status of this role'
      );
    }
  }

  async permanentDeleteRoleById(id: string) {
    try {
      const data = await this.repository.findById(id);
      if (data !== undefined) {
        throw new BadRequestException(
          'Please delete this role after permanently delete'
        );
      } else {
        await this.histService.deleteAllHist(id);
        return this.repository.permanentlyDeleteById(id);
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
