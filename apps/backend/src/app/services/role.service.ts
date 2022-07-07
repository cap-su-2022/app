import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PaginationParams } from '../controllers/pagination.model';
import { RolesRepository } from '../repositories/roles.repository';
import { MasterDataAddRequestPayload } from '../payload/request/master-data-add.request.payload';
import { Roles } from '../models/role.entity';
import { RoleHistService } from './role-hist.service';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(
    private readonly repository: RolesRepository,
    private readonly histService: RoleHistService
  ) {}

  async getRoleById(id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException('Could not find role with provided id.');
      }
      return await this.repository.findById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async deleteRoleById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Role does not found with the existed id'
        );
      }
      const result = await this.repository.deleteById(accountId, id);
      if (result.affected < 1) {
        throw new BadRequestException('Could not delete role by id');
      } else {
        const role = await this.repository.get(id)
        await this.histService.createNew(role);
        return role;
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async handleRestoreDeletedRoleById(id: string) {
    try {
      const result = await this.repository.restoreDeletedRoleById(id);
      if (result.affected < 1) {
        throw new BadRequestException(
          "Role doesn't exist with the provided id"
        );
      } else {
        const role = await this.repository.get(id)
        await this.histService.createNew(role);
        return role;
      }
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'Error occurred while restore the delete status of this role'
      );
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

  async addRole(body: any, accountId: string) {
    const role = await this.repository.save(
      {
        name: body.name.trim(),
        description: body.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: accountId,
        updatedBy: accountId,
      },
      {
        transaction: true,
      }
    );
    await this.histService.createNew(role);
    return role;
  }

  async updateRoleById(
    accountId: string,
    updatePayload: MasterDataAddRequestPayload,
    id: string
  ) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Role does not found with the provided id'
        );
      }
      const role = await this.repository.updateById(
        id,
        accountId,
        updatePayload
      );
      await this.histService.createNew(role);
      return role;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  getRolesByPagination(payload: PaginationParams) {
    return this.repository.findByPagination(payload);
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
