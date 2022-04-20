import {Controller, Get} from "@nestjs/common";
import {Users} from "../models";
import {UsersService} from "../services/users.service";

@Controller("v1/users")
export class UsersController {

  constructor(private readonly service: UsersService) {
  }

  @Get()
  getAll(): Promise<Users> {
    return this.service.getAllByPagination();
  }
}
