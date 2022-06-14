import { Repository, UpdateResult } from "typeorm";
import { Devices } from "../models";
import { RepositoryPaginationPayload } from "../models/search-pagination.payload";
import { AddDeviceRequest, UpdateDeviceRequest } from "@app/models";
import { CustomRepository } from "../decorators/typeorm-ex.decorator";

@CustomRepository(Devices)
export class DevicesRepository extends Repository<Devices> {
  async getSize(): Promise<number> {
    const result = await this.createQueryBuilder(`devices`)
      .select(`COUNT(id) as size`)
      .where(`devices.is_disabled = false`)
      .andWhere(`devices.is_deleted = false`)
      .getRawOne<{
        size: number
      }>();
    return result.size;
  }


  searchDevices(payload: RepositoryPaginationPayload): Promise<Devices[]> {
    return this.createQueryBuilder(`devices`)
      // qb.where(`rooms.name LIKE :name`, {name: `%${payload.search}%`});
      //  qb.orWhere(`rooms.description LIKE :description`, {description: `%${payload.search}%`})
      .where(`devices.is_disabled = false`)
      .andWhere(`devices.is_deleted = false`)
      .orWhere(`devices.name = :name`, { name: `%${payload.search}%` })
      .orWhere(`devices.description = :description`, { description: `%${payload.search}%` })
      .skip(payload.offset)
      .take(payload.limit)
      .getMany();
  }

  deleteDeviceById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("devices")
      .update({
        isDeleted: true
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
      .select("devices.is_disabled")
      .where("devices.id = :id", { id: id })
      .getRawOne<boolean>()
      .then((data) => data ? data["is_disabled"] : true);
  }

  disableById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("devices")
      .update({
        isDisabled: true
      })
      .where("devices.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  restoreDisabledDeviceById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("devices")
      .update({
        isDisabled: false
      })
      .where("devices.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  async restoreDeletedDeviceById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder("devices")
      .update({
        isDeleted: false
      })
      .where("devices.id = :id", { id: id })
      .useTransaction(true)
      .execute();
  }

  getDeletedDevices(): Promise<Devices[]> {
    return this.createQueryBuilder("devices")
      .where("devices.is_deleted = true")
      .getMany();
  }

  getDisabledDevices(): Promise<Devices[]> {
    return this.createQueryBuilder("devices")
      .where("devices.is_disabled = true")
      .andWhere("devices.is_deleted = false")
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
}
