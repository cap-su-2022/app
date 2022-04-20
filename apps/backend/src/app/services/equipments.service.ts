import {Injectable} from "@nestjs/common";
import {BaseService} from "./base.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Equipments} from "../models";
import {Repository} from "typeorm";

@Injectable()
export class EquipmentsService implements BaseService<any, any, any> {

  constructor(@InjectRepository(Equipments) private readonly repository: Repository<Equipments>) {

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
