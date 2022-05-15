import {Injectable} from "@nestjs/common";
import {BaseService} from "./base.service";
import {UsersOTPRepository} from "../repositories/users-otp.repository";

@Injectable()
export class UsersOTPService implements BaseService<any, any, any> {

  constructor(private readonly repository: UsersOTPRepository) {
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
