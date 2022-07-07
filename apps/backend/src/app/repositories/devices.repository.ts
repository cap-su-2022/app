import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { Accounts, Devices, Rooms, RoomType } from '../models';
import { RepositoryPaginationPayload } from '../models/search-pagination.payload';
import { AddDeviceRequest, UpdateDeviceRequest } from '@app/models';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import {
  IPaginationMeta,
  paginateRaw,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DeviceType } from '../models/device-type.entity';
import { DevicesRequestPayload } from '../payload/request/devices.payload';

@CustomRepository(Devices)
export class DevicesRepository extends Repository<Devices> {
  async getSize(): Promise<number> {
    const result = await this.createQueryBuilder(`devices`)
      .select(`COUNT(id) as size`)
      .where(`devices.disabled_at IS NULL`)
      .andWhere(`devices.deleted_at IS NULL`)
      .getRawOne<{
        size: number;
      }>();
    return result.size;
  }

  async isExistedByName(name: string): Promise<boolean> {
    return this.createQueryBuilder('devices')
      .select('COUNT(devices.name)')
      .where('devices.name = :name', { name })
      .getRawOne()
      .then((data) => data['count'] > 0);
  }

  searchDevices(
    payload: DevicesRequestPayload
  ): Promise<Pagination<Devices, IPaginationMeta>> {
    const query = this.createQueryBuilder(`devices`)
      // qb.where(`rooms.name LIKE :name`, {name: `%${payload.search}%`});
      //  qb.orWhere(`rooms.description LIKE :description`, {description: `%${payload.search}%`})
      .where(`devices.disabled_at IS NULL`)
      .andWhere(`devices.deleted_at IS NULL`)
      .orWhere(`devices.name = :name`, { name: `%${payload.search}%` })
      .orWhere(`devices.description = :description`, {
        description: `%${payload.search}%`,
      });
    return paginateRaw<Devices, IPaginationMeta>(query, {
      limit: payload.limit,
      page: payload.page,
    });
  }

  getDevicesByDeviceType(deviceTypeId: string) {
    return this.createQueryBuilder(`device`)
      .select('device.id', 'id')
      .addSelect('device.name', 'name')
      .addSelect('device.device_type_id', 'type')
      .addSelect('dt.name', 'deviceTypeName')
      .innerJoin(DeviceType, 'dt', 'dt.id = device.device_type_id')
      .where(`device.deleted_at IS NULL`)
      .andWhere(`device.disabled_at IS NULL`)
      .andWhere('device.device_type_id = :type', { type: deviceTypeId })

      .getRawMany<Devices>();
  }

  async get(id: string): Promise<Devices> {
    return this.createQueryBuilder('devices')
      .select('devices.id', 'id')
      .addSelect('devices.name', 'name')
      .addSelect('device_type_id', 'type')
      .addSelect('devices.created_at', 'createdAt')
      .addSelect('devices.created_by', 'createdBy')
      .addSelect('devices.updated_at', 'updatedAt')
      .addSelect('devices.updated_by', 'updatedBy')
      .addSelect('devices.disabled_at', 'disabledAt')
      .addSelect('devices.disabled_by', 'disabledBy')
      .addSelect('devices.deleted_at', 'deletedAt')
      .addSelect('devices.deleted_by', 'deletedBy')
      .addSelect('devices.description', 'description')
      .andWhere('devices.id = :deviceId', { deviceId: id })
      .getRawOne<Devices>();
  }

  deleteById(accountId: string, id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('devices')
      .update({
        deletedAt: new Date(),
        deletedBy: accountId,
      })
      .where('devices.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  async checkIfDeviceIsDeletedById(id: string): Promise<boolean> {
    return this.createQueryBuilder('devices')
      .select('devices.deleted_at')
      .where('devices.id = :id', { id: id })
      .getRawOne<boolean>()
      .then((data) => (data ? data['deleted_at'] : true));
  }

  async checkIfDeviceIsDisabledById(id: string): Promise<boolean> {
    return this.createQueryBuilder('devices')
      .select('devices.disabled_at')
      .where('devices.id = :id', { id: id })
      .getRawOne<boolean>()
      .then((data) => (data ? data['disabled_at'] : true));
  }

  disableById(accountId: string, id: string) {
    return this.createQueryBuilder('rooms')
      .update({
        disabledBy: accountId,
        disabledAt: new Date(),
      })
      .where('devices.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  restoreDisabledDeviceById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('devices')
      .update({
        deletedAt: null,
        deletedBy: null,
      })
      .where('devices.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  async restoreDeletedDeviceById(id: string): Promise<UpdateResult> {
    return this.createQueryBuilder('devices')
      .update({
        deletedBy: null,
        deletedAt: null,
      })
      .where('devices.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  getDeletedDevices(): Promise<Devices[]> {
    return this.createQueryBuilder('devices')
      .andWhere(`devices.deleted_at IS NOT NULL`)
      .getMany();
  }

  getDisabledDevices(): Promise<Devices[]> {
    return this.createQueryBuilder('devices')
      .where(`devices.disabled_at IS NOT NULL`)
      .andWhere(`devices.deleted_at IS NULL`)
      .getMany();
  }

  createNewDevice(payload: AddDeviceRequest, userId: string): Promise<Devices> {
    return this.save(
      { ...payload, createdBy: userId },
      {
        transaction: true,
      }
    );
  }

  findDeviceListByBookingRoomRequest(name: string, type: string, sort: string) {
    return this.createQueryBuilder('devices')
      .select(['devices.id', 'devices.name'])
      .where('devices.disabled_at IS NULL')
      .andWhere('devices.deleted_at IS NULL')
      .andWhere('devices.name LIKE :name', { name: `%${name}%` })
      .orderBy('devices.name', sort as 'ASC' | 'DESC')
      .getMany();
  }

  async findById(id: string): Promise<Devices> {
    return this.createQueryBuilder('devices')
      .select('devices.id', 'id')
      .addSelect('devices.name', 'name')
      .addSelect('devices.description', 'description')
      .addSelect('devices.created_at', 'createdAt')
      .addSelect('devices.updated_at', 'updatedAt')
      .addSelect('devices.created_by', 'createdBy')
      .addSelect('devices.updated_by', 'updatedBy')
      .addSelect('devices.disabled_at', 'disableAt')
      .addSelect('devices.deleted_at', 'deletedAt')
      .addSelect('devices.disabled_by', 'disabledBy')
      .addSelect('devices.deleted_by', 'deletedBy')
      .addSelect('devices.device_type_id', 'devicesTypeId')
      .where('devices.disabled_at IS NULL')
      .andWhere('devices.deleted_at IS NULL')
      .andWhere('devices.id = :deviceId', { deviceId: id })
      .getRawOne<Devices>();
  }

  async isExistedById(id: string): Promise<boolean> {
    return this.createQueryBuilder('devices')
      .select('COUNT(devices.name)')
      .where('devices.id = :id', { id })
      .getRawOne()
      .then((data) => data['count'] > 0);
  }
}
