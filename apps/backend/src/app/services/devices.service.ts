import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DevicesRepository } from '../repositories/devices.repository';
import { DevicesResponsePayload } from '../payload/response/devices.payload';
import { AddDeviceRequest, UpdateDeviceRequest } from '@app/models';
import { DevicesRequestPayload } from '../payload/request/devices.payload';
import { Devices } from '../models';
import { Direction } from '../models/search-pagination.payload';
import { RoomTypeUpdateRequestPayload } from '../payload/request/room-type-update.request.payload';

@Injectable()
export class DevicesService {
  private readonly logger = new Logger(DevicesService.name);

  constructor(private readonly repository: DevicesRepository) {}

  async add(payload: AddDeviceRequest): Promise<Devices> {
    try {
      return await this.repository.createNewDevice(payload);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while creating a new device');
    }
  }
  

  addAll(models: any[]): Promise<any[]> {
    return Promise.resolve([]);
  }

  async deleteById(accountId: string, id: string): Promise<void> {
    try {
      const isDeleted = await this.repository.checkIfDeviceIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('Not found with provided id');
      }
      await this.repository.deleteDeviceById(accountId, id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while deleting the device with id');
    }
  }

  async getAll(request: DevicesRequestPayload) {
    return await this.repository
      .searchDevices({
        search: request.search,
        page: request.page,
        limit: request.limit,
        direction: request.sort as Direction[],
      })
      .catch((e) => {
        this.logger.error(e);
        throw new BadRequestException('One or more parameters is invalid');
      });
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

  async updateById(
    accountId: string,
    id: string,
    body: UpdateDeviceRequest
  ): Promise<void> {
    let device;
    try {
      device = await this.repository.findOneOrFail({
        where: {
          id: id,
        },
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Device doesn't exist with the provided id");
    }
    if (device.name !== body.name) {
      const isExisted = await this.repository.isExistedByName(body.name);
      if (isExisted) {
        throw new BadRequestException(
          'The device name you want to use is duplicated!'
        );
      }
    }
    try {
      await this.repository.save(
        {
          ...device,
          name: body.name.trim(),
          description: body.description,
          updatedBy: accountId,
          deviceTypeId: body.type,
        },
        {
          transaction: true,
        }
      );
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Error occurred while updating this room');
    }
  }

  async findById(id: string): Promise<Devices> {
    try {
      return await this.repository.findOneOrFail({
        where: {
          id: id,
        },
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while retrieving device');
    }
  }

  async disableById(id: string): Promise<void> {
    try {
      const isDeleted = await this.repository.checkIfDeviceIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('Not found with provided id');
      }
      await this.repository.disableById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while disabling this device');
    }
  }

  async handleRestoreDisabledDeviceById(id: string): Promise<void> {
    try {
      const isDeleted = await this.repository.checkIfDeviceIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('Not found with provided id');
      }
      await this.repository.restoreDisabledDeviceById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while disabling this device');
    }
  }

  async handleRestoreDeviceById(id: string): Promise<void> {
    try {
      const isDeleted = await this.repository.checkIfDeviceIsDeletedById(id);
      if (!isDeleted) {
        throw new BadRequestException('Not found with provided id');
      }
      await this.repository.restoreDeletedDeviceById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while disabling this device');
    }
  }

  async getDeletedDevices(): Promise<Devices[]> {
    try {
      return await this.repository.getDeletedDevices();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while disabling this device');
    }
  }

  async getDisabledDevices(): Promise<Devices[]> {
    try {
      return await this.repository.getDisabledDevices();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException('Error while disabling this device');
    }
  }

  getBookingRoomDeviceList(name: string, type: string, sort: string) {
    if (!sort) sort = 'ASC';
    if (sort !== 'ASC' && sort !== 'DESC') {
      sort = 'ASC';
    }

    return this.repository.findDeviceListByBookingRoomRequest(name, type, sort);
  }
}
