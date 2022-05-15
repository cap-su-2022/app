import {Injectable} from "@nestjs/common";
import {BaseService} from "./base.service";
import {UsersWarningFlagHistoryRepository} from "../repositories/users-warning-flag-history";

@Injectable()
export class UsersWarningFlagHistoryService implements BaseService<any, any, any> {

  constructor(private readonly repository: UsersWarningFlagHistoryRepository) {

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
