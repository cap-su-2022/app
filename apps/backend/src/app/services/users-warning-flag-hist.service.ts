import {Injectable} from "@nestjs/common";
import {BaseService} from "./base.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UsersWarningFlag} from "../models/users-warning-flag.entity";
import {Repository} from "typeorm";
import {UsersWarningFlagHistory} from "../models";

@Injectable()
export class UsersWarningFlagHistoryService implements BaseService<any, any, any> {

  constructor(@InjectRepository(UsersWarningFlagHistory) private readonly repository: Repository<UsersWarningFlagHistory>) {

  }

  add(model: any): Promise<any> {
    return Promise.resolve(undefined);
  }

  addAll(models: any[]): Promise<any[]> {
    return Promise.resolve([]);
  }

  deleteById(id: any): Promise<void> {
    return Promise.resolve(undefined);
  }

  getAll(): Promise<any[]> {
    return Promise.resolve([]);
  }

  getAllByPagination(): Promise<any[]> {
    return Promise.resolve([]);
  }

  getById(id: any): Promise<any> {
    return Promise.resolve(undefined);
  }

  updateById(model: any, id: any): Promise<any> {
    return Promise.resolve(undefined);
  }

}
