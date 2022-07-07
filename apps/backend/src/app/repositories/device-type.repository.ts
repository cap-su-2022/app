import { Repository, UpdateResult } from 'typeorm';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { DeviceType } from '../models/device-type.entity';
import { PaginationParams } from '../controllers/pagination.model';
import { paginateRaw, Pagination } from 'nestjs-typeorm-paginate';
import { RoomType } from '../models/room-type.entity';
import { Accounts } from '../models';
import { MasterDataAddRequestPayload } from '../payload/request/master-data-add.request.payload';

@CustomRepository(DeviceType)
export class DeviceTypeRepository extends Repository<DeviceType> {
  findByPagination(
    pagination: PaginationParams
  ): Promise<Pagination<DeviceType>> {
    const query = this.createQueryBuilder('dt')
      .select('dt.id', 'id')
      .addSelect('dt.name', 'name')
      .where('dt.deleted_at IS NULL')
      .andWhere('LOWER(dt.name) LIKE LOWER(:search)', {
        search: `%${pagination.search.trim()}%`,
      })
      .orderBy(pagination.sort, pagination.dir as 'ASC' | 'DESC');

    return paginateRaw<RoomType>(query, {
      page: pagination.page,
      limit: pagination.limit,
    });
  }

  async findById(id: string): Promise<DeviceType> {
    return this.createQueryBuilder('dt')
      .select('dt.id', 'id')
      .addSelect('dt.name', 'name')
      .addSelect('dt.description', 'description')
      .addSelect('a.username', 'createdBy')
      .addSelect('dt.created_at', 'createdAt')
      .addSelect('aa.username', 'updatedBy')
      .addSelect('dt.updated_at', 'updatedAt')
      .innerJoin(Accounts, 'a', 'a.id = dt.created_by')
      .leftJoin(Accounts, 'aa', 'aa.id = dt.updated_by')
      .where('dt.id = :id', { id: id })
      .andWhere('dt.deleted_at IS NULL')
      .getRawOne<DeviceType>();
  }

  findDeviceTypeName(): Promise<DeviceType[]> {
    return this.createQueryBuilder('dt')
      .select('dt.id', 'id')
      .addSelect('dt.name', 'name')
      .andWhere('dt.deleted_at IS NULL')
      .getRawMany<DeviceType>();
  }

  async get(id: string): Promise<DeviceType> {
    return this.createQueryBuilder('dt')
      .select('dt.id', 'id')
      .addSelect('dt.name', 'name')
      .addSelect('dt.description', 'description')
      .addSelect('dt.created_by', 'createdBy')
      .addSelect('dt.created_at', 'createdAt')
      .addSelect('dt.updated_by', 'updatedBy')
      .addSelect('dt.updated_at', 'updatedAt')
      .addSelect('dt.deleted_by', 'deletedBy')
      .addSelect('dt.deleted_at', 'deletedAt')

      .where('dt.id = :id', { id: id })
      .getRawOne<DeviceType>();
  }

  async addNew(
    accountId: string,
    payload: { name: string; description: string }
  ): Promise<DeviceType> {
    return this.save<DeviceType>(
      {
        name: payload.name.trim(),
        description: payload.description,
        createdBy: accountId,
        createdAt: new Date(),
      },
      {
        transaction: true,
      }
    );
  }

  async deleteByIdAndAccountId(
    accountId: string,
    id: string
  ): Promise<UpdateResult> {
    return this.createQueryBuilder('rt')
      .update({
        deletedAt: new Date(),
        deletedBy: accountId,
      })
      .where('rt.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  existsById(id: string): Promise<boolean> {
    return this.createQueryBuilder('rt')
      .select('COUNT(1)', 'count')
      .where('rt.id = :id', { id: id })
      .getRawOne()
      .then((data) => data?.count > 0);
  }

  restoreDisabledById(accountId: string, id: string) {
    return this.createQueryBuilder('rt')
      .update({
        updatedAt: new Date(),
        updatedBy: accountId,
      })
      .where('rt.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }

  async deleteById(accountId: string, id: string) {
    const isDeleted = await this.createQueryBuilder('device_type')
      .update({
        deletedAt: new Date(),
        deletedBy: accountId,
      })
      .where('device_type.id = :id', { id: id })
      .useTransaction(true)
      .execute();
    if (isDeleted.affected > 0) {
      return this.get(id);
    }
  }

  findDeletedByPagination(search: string): Promise<DeviceType[]> {
    return this.createQueryBuilder('device_type')
      .select('device_type.id', 'id')
      .addSelect('device_type.name', 'name')
      .addSelect('device_type.deleted_at', 'deletedAt')
      .addSelect('a.username', 'deletedBy')
      .innerJoin(Accounts, 'a', 'a.id = device_type.deleted_by')
      .where('device_type.name LIKE :search', { search: `%${search.trim()}%` })
      .andWhere('device_type.deleted_at IS NOT NULL')
      .orderBy('device_type.deleted_at', 'DESC')
      .getRawMany<DeviceType>();
  }

  async restoreDeletedById(accountId: string, id: string) {
    const isRestored = await this.createQueryBuilder('device_type')
      .update({
        updatedAt: new Date(),
        updatedBy: accountId,
        deletedAt: null,
        deletedBy: null,
      })
      .where('device_type.id = :id', { id: id })
      .useTransaction(true)
      .execute();
    if (isRestored.affected > 0) {
      return this.get(id);
    }
  }

  updateById(
    accountId: string,
    deviceTypeId: string,
    payload: MasterDataAddRequestPayload
  ) {
    return this.save(
      {
        id: deviceTypeId,
        name: payload.name.trim(),
        description: payload.description,
        updatedBy: accountId,
        updatedAt: new Date(),
      },
      {
        transaction: true,
      }
    );
  }

  async permanentlyDeleteById(id: string) {
    return this.createQueryBuilder('device_type')
      .delete()
      .where('device_type.id = :id', { id: id })
      .useTransaction(true)
      .execute();
  }
}
