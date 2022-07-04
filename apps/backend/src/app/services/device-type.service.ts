import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DeviceTypeRepository } from '../repositories/device-type.repository';
import { PaginationParams } from '../controllers/pagination.model';

@Injectable()
export class DeviceTypeService {
  private readonly logger = new Logger(DeviceTypeService.name);

  constructor(private readonly repository: DeviceTypeRepository) {}
  async getAllDeviceTypes(param: PaginationParams) {
    try {
      return await this.repository.findByPagination(param);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async getDeviceTypeById(id: string) {
    try {
      return await this.repository.findById(id);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  getDeviceTypeNames() {
    try {
      return this.repository.findDeviceTypeName();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async updateDeviceTypeById(
    accountId: string,
    id: string,
    payload: { name: string; description: string }
  ) {
    try {
      return await this.repository.updateById(accountId, id, payload);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async deleteDeviceTypeById(accountId: string, id: string) {
    try {
      return await this.repository.deleteById(accountId, id);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  getDeletedDeviceTypes(search: string) {
    try {
      return this.repository.findDeletedByPagination(search);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async restoreDeletedRoomTypeById(accountId: string, id: string) {
    try {
      const isExisted = this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room type does not exist with the provided id'
        );
      }
      return await this.repository.restoreDeletedById(accountId, id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async permanentlyDeleteDeviceTypeById(id: string) {
    try {
      return await this.repository.permanentlyDeleteById(id);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async addNewDeviceType(
    accountId: string,
    payload: { name: string; description: string }
  ) {
    try {
      return await this.repository.addNew(accountId, payload);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }
}
