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
import { DevicesPaginationParams } from '../controllers/devices-pagination.model';

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

  searchDevices(payload: DevicesPaginationParams) {
    const query = this.createQueryBuilder('d')
      .select('d.id', 'id')
      .addSelect('d.name', 'name')
      .addSelect('d.description', 'description')
      .addSelect('d.createdAt', 'createdAt')
      .addSelect('d.updatedAt', 'updatedAt')
      // .addSelect('a.username', 'createdBy')
      // .addSelect('aa.username', 'updatedBy')
      .addSelect('dt.name', 'type')
      // .innerJoin(Accounts, 'a', 'd.created_by = a.id')
      // .innerJoin(Accounts, 'aa', 'd.updated_by = aa.id')
      .innerJoin(DeviceType, 'dt', 'dt.id = d.type')
      .where('LOWER(d.name) ILIKE LOWER(:search)', {
        search: `%${payload.search.trim()}%`,
      })
      .andWhere(`d.deleted_at IS NULL`)
      .andWhere(`d.disabled_at IS NULL`)
      .orderBy(payload.sort, payload.dir as 'ASC' | 'DESC');
    if (payload.deviceType && payload.deviceType !== '') {
      query.andWhere('dt.name = :deviceTypeName', {
        deviceTypeName: payload.deviceType,
      });
    }
    return paginateRaw<Devices>(query, {
      limit: payload.limit,
      page: payload.page,
    });
  }

  getDevicesByDeviceType(deviceTypeId: string) {
    return this.createQueryBuilder(`device`)
      .select('device.id', 'id')
      .addSelect('device.name', 'name')
      .addSelect('device.type', 'type')
      .addSelect('dt.name', 'deviceTypeName')
      .innerJoin(DeviceType, 'dt', 'dt.id = device.type')
      .where(`device.deleted_at IS NULL`)
      .andWhere(`device.disabled_at IS NULL`)
      .andWhere('device.type = :type', { type: deviceTypeId })

      .getRawMany<Devices>();
  }

  async get(id: string): Promise<Devices> {
    return this.createQueryBuilder('devices')
      .select('devices.id', 'id')
      .addSelect('devices.name', 'name')
      .addSelect('type', 'type')
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
        disabledAt: null,
        disabledBy: null,
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

  getDeletedDevices(search: string) {
    return this.createQueryBuilder(`devices`)
      .select('devices.id', 'id')
      .addSelect('devices.name', 'name')
      .addSelect('devices.deleted_at', 'deletedAt')
      .addSelect('a.username', 'deletedBy')
      .addSelect('dt.name', 'deviceTypeName')
      .innerJoin(Accounts, 'a', 'devices.deleted_by = a.id')
      .innerJoin(DeviceType, 'dt', 'dt.id = devices.type')
      .where(`devices.deleted_at IS NOT NULL`)
      .andWhere(`devices.disabled_at IS NULL`)
      .andWhere('devices.name ILIKE :name', { name: `%${search.trim()}%` })
      .getRawMany<Devices>();
  }

  getDisabledDevices(search: string) {
    return this.createQueryBuilder('devices')
      .select('devices.id', 'id')
      .addSelect('devices.name', 'name')
      .addSelect('devices.disabled_at', 'disabledAt')
      .addSelect('a.username', 'disabledBy')
      .addSelect('dt.name', 'roomTypeName')
      .innerJoin(Accounts, 'a', 'devices.disabled_by = a.id')
      .innerJoin(DeviceType, 'dt', 'devices.type = dt.id')
      .where(`devices.deleted_at IS NULL`)
      .andWhere(`devices.disabled_at IS NOT NULL`)
      .andWhere('devices.name ILIKE :search', { search: `%${search.trim()}%` })
      .getRawMany<Rooms>();
  }

  createNewDevice(payload: AddDeviceRequest, userId: string): Promise<Devices> {
    return this.save(
      { name: payload.name.trim(),
        description: payload.description,
        type: payload.type,
        createdBy: userId,
        createdAt: new Date(), },
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
      // .addSelect('devices.created_by', 'createdBy')
      // .addSelect('devices.updated_by', 'updatedBy')
      .addSelect('devices.disabled_at', 'disableAt')
      .addSelect('devices.deleted_at', 'deletedAt')
      .addSelect('devices.disabled_by', 'disabledBy')
      .addSelect('devices.deleted_by', 'deletedBy')
      .addSelect('devices.type', 'deviceTypeId')
      .addSelect('dt.name', 'deviceTypeName')
      .addSelect('a.username', 'createdBy')
      .addSelect('aa.username', 'updatedBy')
      .innerJoin(Accounts, 'a', 'devices.created_by = a.id')
      .leftJoin(Accounts, 'aa', 'devices.updated_by = aa.id')
      .innerJoin(DeviceType, 'dt', 'dt.id = devices.type')
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
