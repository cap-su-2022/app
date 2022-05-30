import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import {DevicesRepository} from "../repositories/devices.repository";
import {DevicesResponsePayload} from "../payload/response/devices.payload";
import { NoSuchElementFoundException } from "../exception/no-such-element-found.exception";
import { Devices } from "../models/devices";
import {AddDeviceRequest, UpdateDeviceRequest} from "@app/models";
import {DevicesRequestPayload} from "../payload/request/devices.payload";
import {DeleteResult} from "typeorm";

@Injectable()
export class DevicesService {

  private readonly logger = new Logger(DevicesService.name);

  constructor(private readonly repository: DevicesRepository) {

  }

  add(payload: AddDeviceRequest): Promise<Devices> {
    return this.repository.save(payload, {
      transaction: true
    });
  }

  addAll(models: any[]): Promise<any[]> {
    return Promise.resolve([]);
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.repository.createQueryBuilder('devices')
      .update({
        isDeleted: true
      })
      .where("devices.id = :id", {id: id})
      .useTransaction(true)
      .execute();
  }

  async getAll(request: DevicesRequestPayload): Promise<DevicesResponsePayload> {
    const offset = request.size * (request.page - 1);
    const limit = request.size;

    const queryResult = await this.repository.searchDevices(
        {
          search: request.search,
          offset: offset,
          limit: limit,
          direction: request.sort
        }).catch((e) => {
          this.logger.error(e);
          throw new BadRequestException("One or more parameters is invalid");
        });

    const total = await this.repository.getSize().catch((e) => {
      this.logger.error(e);

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

  async updateById(body: UpdateDeviceRequest, id: string): Promise<Devices> {
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

  findById(id: string): Promise<Devices> {
    return this.repository.findOneOrFail(id);
  }

  disableById(id: string) {
    return this.repository.createQueryBuilder('devices')
      .update({
        isDisabled: true
      })
      .where("devices.id = :id", {id: id})
      .useTransaction(true)
      .execute();
  }

  handleRestoreDisabledDeviceById(id: string) {
    return this.repository.createQueryBuilder('devices')
      .update({
        isDisabled: false
      })
      .where("devices.id = :id", {id: id})
      .useTransaction(true)
      .execute();  }

  handleRestoreDeviceById(id: string) {
    return this.repository.createQueryBuilder('devices')
      .update({
        isDeleted: false
      })
      .where("devices.id = :id", {id: id})
      .useTransaction(true)
      .execute();  }

  getDeletedDevices() {
    return this.repository.createQueryBuilder('devices')
      .where('devices.is_deleted = true')
      .getMany();  }

  getDisabledDevices() {
    return this.repository.createQueryBuilder('devices')
      .where("devices.is_disabled = true")
      .andWhere('devices.is_deleted = false')
      .getMany();
  }
}
