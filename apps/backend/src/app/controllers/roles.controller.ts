import {Controller, Get} from "@nestjs/common";
import {RolesService} from "../services/role.service";
import {Roles} from "../models/roles.entity";

@Controller('/v1/roles')
export class RolesController {

  constructor(private readonly service: RolesService) {
  }

  @Get()
  getAll(): Promise<Roles[]> {
    return this.service.getAllByPagination();
  }

}
