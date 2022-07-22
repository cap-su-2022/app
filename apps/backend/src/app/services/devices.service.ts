import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DevicesRepository } from '../repositories/devices.repository';
import { DevicesResponsePayload } from '../payload/response/devices.payload';
import { AddDeviceRequest, UpdateDeviceRequest } from '@app/models';
import { DevicesRequestPayload } from '../payload/request/devices.payload';
import { Devices } from '../models';
import { Direction } from '../models/search-pagination.payload';
import { MasterDataAddRequestPayload } from '../payload/request/master-data-add.request.payload';
import { DeviceHistService } from './devices-hist.service';
import { DevicesPaginationParams } from '../controllers/devices-pagination.model';
import { DataAddRequestPayload } from '../payload/request/data-add.request.payload';

@Injectable()
export class DevicesService {
  private readonly logger = new Logger(DevicesService.name);

  constructor(
    private readonly repository: DevicesRepository,
    private readonly histService: DeviceHistService
  ) {}

  async getAll(request: DevicesPaginationParams) {
    try {
      const result = await this.repository.searchDevices(request);
      return result;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('One or more parameters is invalid');
    }
  }

  async getDevicesByDeviceType(deviceTypeId: string): Promise<Devices[]> {
    try {
      return await this.repository.getDevicesByDeviceType(deviceTypeId);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'An error occurred while getting rooms by type ' + deviceTypeId
      );
    }
  }

  getDeviceNames() {
    try {
      return this.repository.findDeviceName();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  // getBookingRoomDeviceList(name: string, type: string, sort: string) {
  //   if (!sort) sort = 'ASC';
  //   if (sort !== 'ASC' && sort !== 'DESC') {
  //     sort = 'ASC';
  //   }

  //   return this.repository.findDeviceListByBookingRoomRequest(name, type, sort);
  // }

  async findById(id: string): Promise<Devices> {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Device does not found with the provided id'
        );
      }
      const result = await this.repository.findById(id);
      if (!result) {
        throw new BadRequestException(
          'This device is already deleted or disabled'
        );
      }
      return result;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'An error occurred while retrieving this Device'
      );
    }
  }

  async add(payload: AddDeviceRequest, userId: string): Promise<Devices> {
    const isExisted = await this.repository.isExistedByName(payload.name);
    if (isExisted) {
      throw new BadRequestException('Device name is duplicated!');
    }
    try {
      const deviceAdded = await this.repository.createNewDevice(
        payload,
        userId
      );
      await this.histService.createNew(deviceAdded);
      return deviceAdded;
    } catch (e) {
      this.logger.error(e.message);
      if (
        e.message.includes('constraint') &&
        e.message.includes('devices_device_type_id_fk')
      ) {
        throw new BadRequestException(
          'There is no device type with the provided id'
        );
      }
      throw new BadRequestException('Error while creating a new device');
    }
  }

  // addAll(models: any[]): Promise<any[]> {
  //   return Promise.resolve([]);
  // }

  async updateById(accountId: string, id: string, body: DataAddRequestPayload) {
    const isExisted = await this.repository.existsById(id);
    if (!isExisted) {
      throw new BadRequestException(
        'Device does not found with the provided id'
      );
    }
    const data = await this.repository.findById(id);
    if (data === undefined) {
      throw new BadRequestException(
        'This device is already deleted or disabled'
      );
    }
    try {
      const deviceUpdated = await this.repository.updateById(
        accountId,
        id,
        body
      );
      await this.histService.createNew(deviceUpdated);
      return deviceUpdated;
    } catch (e) {
      this.logger.error(e);
      if (
        e.message.includes('constraint') &&
        e.message.includes('devices_device_type_id_fk')
      ) {
        throw new BadRequestException(
          'There is no device type with the provided id'
        );
      }
      throw new BadRequestException(e.message);
    }
  }

  async disableById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Device does not found with the provided id'
        );
      }
      const isDisabled = await this.repository.checkIfDeviceIsDisabledById(id);
      if (isDisabled) {
        throw new BadRequestException('This device is already disabled');
      }
      const isDeleted = await this.repository.checkIfDeviceIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('This device is already deleted, can not disable');
      }
      const device = await this.repository.disableById(accountId, id);
      await this.histService.createNew(device);
      return device;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getDisabledDevices(search: string): Promise<Devices[]> {
    try {
      return await this.repository.getDisabledDevices(search);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while disabling this device');
    }
  }

  async handleRestoreDisabledDeviceById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Device does not found with the provided id'
        );
      }
      const isDeleted = await this.repository.checkIfDeviceIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('This device is already deleted');
      }
      const isDisabled = await this.repository.checkIfDeviceIsDisabledById(id);
      if (!isDisabled) {
        throw new BadRequestException(
          'This device ID is now active. Cannot restore it'
        );
      }
      const device = await this.repository.restoreDisabledDeviceById(accountId, id);
      await this.histService.createNew(device);
      return device;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async deleteById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Device does not found with the provided id'
        );
      }
      const isDeleted = await this.repository.checkIfDeviceIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('This device is already deleted');
      }
      const device = await this.repository.deleteById(accountId, id);
      await this.histService.createNew(device);
      return device;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getDeletedDevices(search: string): Promise<Devices[]> {
    try {
      return await this.repository.getDeletedDevices(search);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while get deleted devices');
    }
  }

  async handleRestoreDeletedDeviceById(id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Device does not found with the provided id'
        );
      }
      const isDisabled = await this.repository.checkIfDeviceIsDisabledById(id);
      if (isDisabled) {
        throw new BadRequestException('This device is already disabled');
      }
      const isDeleted = await this.repository.checkIfDeviceIsDeletedById(id);
      if (!isDeleted) {
        throw new BadRequestException(
          'This device ID is now active. Cannot restore it'
        );
      }

      const device = await this.repository.restoreDeletedDeviceById(id);
      await this.histService.createNew(device);
      return device;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  // getBookingRoomDeviceList(name: string, type: string, sort: string) {
  //   if (!sort) sort = 'ASC';
  //   if (sort !== 'ASC' && sort !== 'DESC') {
  //     sort = 'ASC';
  //   }

  //   return this.repository.findDeviceListByBookingRoomRequest(name, type, sort);
  // }
}
