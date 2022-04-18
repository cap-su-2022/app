import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Users} from "../models/users.entity";
import {BaseService} from "./base.service";
import {UsersDTO} from "../dto/request/users.dto";

@Injectable()
export class UsersService extends BaseService<UsersDTO, Users, string>{

  constructor(private readonly repository: Repository<Users>) {
    super();
  }

  getAll(): Promise<Users[]> {
    return null;
  }

  add(model: UsersDTO): Promise<Users> {
    return Promise.resolve(undefined);
  }

  addAll(models: UsersDTO[]): Promise<Users[]> {
    return Promise.resolve([]);
  }

  deleteById(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getAllByPagination(): Promise<Users[]> {
    return Promise.resolve([]);
  }

  getById(id: string): Promise<Users> {
    return Promise.resolve(undefined);
  }

  updateById(model: UsersDTO, id: string): Promise<Users> {
    return Promise.resolve(undefined);
  }
}
