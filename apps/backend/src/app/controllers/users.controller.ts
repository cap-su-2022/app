import {Controller, Get} from "@nestjs/common";
import {UsersService} from "../services/users.service";
import {Users} from "../models/users.entity";

@Controller("v1/users")
export class UsersController {

  constructor(private readonly service: UsersService) {
  }

  @Get()
  getAll(): Promise<Users[]> {
    return this.service.getAllByPagination();
  }
}
