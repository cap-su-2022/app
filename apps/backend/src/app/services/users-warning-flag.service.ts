import {Injectable} from "@nestjs/common";
import {BaseService} from "./base.service";
import {UsersWarningFlag} from "../models/users-warning-flag.entity";
import {UsersWarningFlagRepository} from "../repositories/users-warning-flag";

@Injectable()
export class UsersWarningFlagService implements BaseService<any, any, any> {

  constructor(private readonly repository: UsersWarningFlagRepository) {

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
