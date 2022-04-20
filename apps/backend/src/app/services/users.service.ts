import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Users} from "../models/users.entity";
import {BaseService} from "./base.service";
import {UsersDTO} from "@app/models";
import {UsersRepository} from "../repositories/users.repository";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersService extends BaseService<UsersDTO, Users, string>{

  constructor(@InjectRepository(Users) private readonly repository: UsersRepository) {
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
    return this.repository.find();
  }

  getById(id: string): Promise<Users> {
    return Promise.resolve(undefined);
  }

  updateById(model: UsersDTO, id: string): Promise<Users> {
    return Promise.resolve(undefined);
  }
}
