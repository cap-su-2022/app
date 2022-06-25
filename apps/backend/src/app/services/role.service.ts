import { Injectable } from "@nestjs/common";
import {PaginationParams} from "../controllers/pagination.model";
import {RolesRepository} from "../repositories/roles.repository";

@Injectable()
export class RoleService {

  constructor(private readonly repository: RolesRepository) {
  }

  getRoleById(id: string) {
      return this.repository.findById(id);
  }
  deleteRoleById(id: string) {
      throw new Error("Method not implemented.");
  }
  addRole(body: any, accountId: string) {
      return this.repository.save({
        name: body.name,
        description: body.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: accountId,
        updatedBy: accountId,

      }, {
        transaction: true
      });
  }
  updateRoleById(account_id: string, id: string, body: any) {
      throw new Error("Method not implemented.");
  }




  getRolesByPagination(payload: PaginationParams) {
    return this.repository.findByPagination(payload);
  }
}
