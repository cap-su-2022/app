import {BadRequestException, Injectable} from "@nestjs/common";
import {BaseService} from "./base.service";
import {EquipmentsRepository} from "../repositories/equipments.repository";
import {DevicesResponsePayload} from "../payload/response/devices.payload";
import {EquipmentsRequestPayload} from "../payload/request/equipments.payload";
import { NoSuchElementFoundException } from "../exception/no-such-element-found.exception";
import { Equipments } from "../models/equipments.entity";
import { UpdateDeviceRequest } from "@app/models";

@Injectable()
export class EquipmentsService {

  constructor(private readonly repository: EquipmentsRepository) {

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

  async getAll(request: EquipmentsRequestPayload): Promise<DevicesResponsePayload> {
    const offset = request.size * (request.page - 1);
    const limit = request.size;

    const queryResult = await this.repository.searchDevices(
        {
          search: request.search,
          offset: offset,
          limit: limit,
          direction: request.sort
        }).catch(() => {
          throw new BadRequestException("One or more parameters is invalid");
        });

    const total = await this.repository.getSize().catch(() => {
      throw new BadRequestException("One or more parameters is invalid");
    });
    const totalPage = Math.ceil(total / request.size);

    return {
      data: queryResult,
      currentPage: request.page,
      totalPage: totalPage,
      size: total
    };
  }

  getAllByPagination(): Promise<any[]> {
    return Promise.resolve([]);
  }

  async updateById(body: UpdateDeviceRequest, id: string): Promise<Equipments> {
    let device;

    try {
      device = await this.repository.findOneOrFail({

      });
    } catch (e) {
      throw new NoSuchElementFoundException();
    }


    return this.repository.save(
      {
        ...device,
        ...body
      }, {
      transaction: true
      }
    );

  }

  findById(id: string) {
    return this.repository.findOneOrFail(id);
  }

  disableById(id: string) {
    return this.repository.query('UPDATE SET equipment e SET e.is_disabled = 1 WHERE e.id = ?', [id]);
  }

  handleRestoreDisabledDeviceById(id: string) {
    return this.repository.query('UPDATE SET equipment e SET e.is_disabled = 0 WHERE e.id = ?', [id]);
  }

  handleRestoreDeviceById(id: string) {
    return this.repository.query('UPDATE SET equipments e SET e.is_deleted = 0 WHERE e.id = ?', [id]);
  }

  getDeletedDevices() {
    return this.repository.query('SELECT * FROM equipments e WHERE e.is_deleted = 1');
  }

  getDisabledDevices() {
    return this.repository.query('SELECT * FROM equipments e WHERE e.is_disabled = 1 AND e.is_deleted = 0');
  }
}
