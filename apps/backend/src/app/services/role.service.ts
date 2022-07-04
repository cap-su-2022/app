import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PaginationParams } from '../controllers/pagination.model';
import { RolesRepository } from '../repositories/roles.repository';
import { RoomTypeUpdateRequestPayload } from '../payload/request/room-type-update.request.payload';
import { Roles } from '../models/role.entity';


@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(private readonly repository: RolesRepository) {}

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

  addRole(body: any, accountId: string) {
    return this.repository.save(
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
  }

  async updateRoleById(
    accountId: string,
    updatePayload: RoomTypeUpdateRequestPayload,
    id: string
  ) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Role does not found with the provided id'
        );
      }
      return await this.repository.updateById(id, accountId, updatePayload);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  getRolesByPagination(payload: PaginationParams) {
    return this.repository.findByPagination(payload);
  }
}
