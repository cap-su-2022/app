import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DeviceTypeRepository } from '../repositories/device-type.repository';
import { PaginationParams } from '../controllers/pagination.model';
import { MasterDataAddRequestPayload } from '../payload/request/master-data-add.request.payload';
import { DeviceTypeHistService } from './device-type-hist.service';

@Injectable()
export class DeviceTypeService {
  private readonly logger = new Logger(DeviceTypeService.name);

  constructor(
    private readonly repository: DeviceTypeRepository,
    private readonly histService: DeviceTypeHistService
  ) {}
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
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException(
          'This device type is already deleted or disabled'
        );
      }
      return data;
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

  async addNewDeviceType(
    accountId: string,
    payload: { name: string; description: string }
  ) {
    try {
      const deviceType = await this.repository.addNew(accountId, payload);
      await this.histService.createNew(deviceType);
      return deviceType;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async updateDeviceTypeById(
    accountId: string,
    id: string,
    payload: MasterDataAddRequestPayload
  ) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Device type does not found with the provided id'
        );
      }
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException(
          'This device type is already deleted or disabled'
        );
      }
      const deviceType = await this.repository.updateById(accountId, id, payload);
      await this.histService.createNew(deviceType);
      return deviceType;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async deleteDeviceTypeById(accountId: string, id: string) {
    try {
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException(
          'This room is already deleted or disabled'
        );
      } else {
        const deviceType = await this.repository.deleteById(accountId, id);
        await this.histService.createNew(deviceType);
        return deviceType;
      }
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

  async restoreDeletedDeviceTypeById(accountId: string, id: string) {
    try {
      const isExisted = this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Device type does not exist with the provided id'
        );
      }
      const data = await this.repository.findById(id);
      if (data !== undefined) {
        throw new BadRequestException(
          'This device type ID is now active. Cannot restore it'
        );
      }
      const deviceType = await this.repository.restoreDeletedById(accountId, id);
      await this.histService.createNew(deviceType);
      return deviceType;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async permanentlyDeleteDeviceTypeById(id: string) {
    try {
      const data = await this.repository.findById(id);
      if (data !== undefined) {
        throw new BadRequestException(
          'Please delete this type after permanently delete'
        );
      } else {
        await this.histService.deleteAllHist(id);
        return this.repository.permanentlyDeleteById(id);
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
