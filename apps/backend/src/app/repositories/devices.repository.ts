import { Repository, UpdateResult } from "typeorm";
import { Devices } from "../models";
import { RepositoryPaginationPayload } from "../models/search-pagination.payload";
import { AddDeviceRequest, UpdateDeviceRequest } from "@app/models";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";
import {IPaginationMeta, paginateRaw, Pagination} from "nestjs-typeorm-paginate";

@CustomRepository(Devices)
export class DevicesRepository extends Repository<Devices> {
  async getSize(): Promise<number> {
    const result = await this.createQueryBuilder(`devices`)
      .select(`COUNT(id) as size`)
      .where(`devices.disabled_at IS NULL`)
      .andWhere(`devices.deleted_at IS NULL`)
      .getRawOne<{
        size: number
      }>();
    return result.size;
  }


  searchDevices(payload: RepositoryPaginationPayload): Promise<Pagination<Devices, IPaginationMeta>> {
    const query = this.createQueryBuilder(`devices`)
      // qb.where(`rooms.name LIKE :name`, {name: `%${payload.search}%`});
      //  qb.orWhere(`rooms.description LIKE :description`, {description: `%${payload.search}%`})
      .where(`devices.disabled_at IS NULL`)
      .andWhere(`devices.deleted_at IS NULL`)
      .orWhere(`devices.name = :name`, { name: `%${payload.search}%` })
      .orWhere(`devices.description = :description`, { description: `%${payload.search}%` });
    return paginateRaw<Devices, IPaginationMeta>(query, {
      limit: payload.limit,
      page: payload.page,
    });
  }

  deleteDeviceById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("devices")
      .update({
        deletedAt: new Date(),
        deletedBy: ''
      })
      .where("devices.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  async checkIfDeviceIsDeletedById(id: string): Promise<boolean> {
    return this.createQueryBuilder("devices")
      .select("devices.is_deleted")
      .where("devices.id = :id", { id: id })
      .getRawOne<boolean>()
      .then((data) => data ? data["is_deleted"] : true);
  }

  async checkIfDeviceIsDisabledById(id: string): Promise<boolean> {
    return this.createQueryBuilder("devices")
      .select("devices.disabled_at")
      .where("devices.id = :id", { id: id })
      .getRawOne<boolean>()
      .then((data) => data ? data["disabled_at"] : true);
  }

  disableById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("devices")
      .update({
        disabledAt: new Date(),
        disabledBy: ''
      })
      .where("devices.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  restoreDisabledDeviceById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("devices")
      .update({
          deletedAt: null,
        deletedBy: null,
      })
      .where("devices.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  async restoreDeletedDeviceById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("devices")
      .update({
        deletedBy: null,
        deletedAt: null,

      })
      .where("devices.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  getDeletedDevices(): Promise<Devices[]> {
    return this.createQueryBuilder("devices")
      .andWhere(`devices.deleted_at IS NOT NULL`)      .getMany();
  }

  getDisabledDevices(): Promise<Devices[]> {
    return this.createQueryBuilder("devices")
      .where(`devices.disabled_at IS NOT NULL`)
      .andWhere(`devices.deleted_at IS NULL`)
      .getMany();
  }

  createNewDevice(payload: AddDeviceRequest): Promise<Devices> {
    return this.save(payload, {
      transaction: true
    });
  }

  updateById(origin: Devices, body: UpdateDeviceRequest, id: string) {
    return this.save(
      {
        ...origin,
        ...body
      }, {
        transaction: true
      }
    );
  }

  findDeviceListByBookingRoomRequest(name: string, type: string, sort: string) {
    return this.createQueryBuilder("devices")
      .select(["devices.id", "devices.name"])
      .where("devices.is_disabled = false")
      .andWhere("devices.is_deleted = false")
      .andWhere("devices.name LIKE :name", { name: `%${name}%` })
      .orderBy("devices.name", sort as "ASC" | "DESC")
      .getMany();
  }
}
