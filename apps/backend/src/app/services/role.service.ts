import {Injectable} from "@nestjs/common";
import {BaseService} from "./base.service";

@Injectable()
export class RolesService implements BaseService<any, any, any> {
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
