import {Injectable} from "@nestjs/common";
import {BaseService} from "./base.service";
import {EquipmentsHistoryRepository} from "../repositories/equipments-history.repository";

@Injectable()
export class EquipmentsHistoryService implements BaseService<any, any, any> {

  constructor(private readonly repository: EquipmentsHistoryRepository) {

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
