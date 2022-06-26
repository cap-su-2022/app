import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PaginationParams } from '../controllers/pagination.model';
import { RolesRepository } from '../repositories/roles.repository';

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

  addRole(body: any, accountId: string) {
    return this.repository.save(
      {
        name: body.name,
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

  updateRoleById(account_id: string, id: string, body: any) {
    throw new Error('Method not implemented.');
  }

  getRolesByPagination(payload: PaginationParams) {
    return this.repository.findByPagination(payload);
  }
}
