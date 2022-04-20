import {Injectable} from "@nestjs/common";
import {BaseService} from "./base.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UsersOTP} from "../models";
import {Repository} from "typeorm";

@Injectable()
export class UsersOTPService implements BaseService<any, any, any> {

  constructor(@InjectRepository(UsersOTP) private readonly repository: Repository<UsersOTP>) {
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
