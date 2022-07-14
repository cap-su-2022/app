import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AddRoomRequest, UpdateRoomRequest } from '@app/models';
import { Rooms } from '../models';
import { RoomsRepository } from '../repositories';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { ChooseBookingRoomFilterPayload } from '../payload/request/choose-booking-room-filter.payload';
import { RoomsPaginationParams } from '../controllers/rooms-pagination.model';
import { RoomHistService } from './room-hist.service';
import { DataAddRequestPayload } from '../payload/request/data-add.request.payload';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    private readonly repository: RoomsRepository,
    private readonly histService: RoomHistService
  ) {}

  async getAll(request: RoomsPaginationParams) {
    try {
      return await this.repository.searchRoom(request);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('One or more parameters is invalid');
    }
  }

  async getRoomNames() {
    try {
      return await this.repository.findRoomNames();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getRoomsByRoomType(roomTypeId: string): Promise<Rooms[]> {
    try {
      return await this.repository.getRoomsByRoomType(roomTypeId);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ??
          'An error occurred while getting rooms by type ' + roomTypeId
      );
    }
  }

  async findById(id: string): Promise<Rooms> {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room does not found with the provided id'
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
        e.message ?? 'An error occurred while retrieving this room'
      );
    }
  }

  async add(
    user: KeycloakUserInstance,
    room: DataAddRequestPayload
  ): Promise<Rooms> {
    try {
      const isExisted = await this.repository.isExistedByName(room.name);
      if (isExisted) {
        throw new BadRequestException('Room name is duplicated!');
      }
      const roomAdded = await this.repository.createNewRoom(
        room,
        user.account_id
      );
      await this.histService.createNew(roomAdded);
      return roomAdded;
    } catch (e) {
      this.logger.error(e.message);
      if (
        e.message.includes('constraint') &&
        e.message.includes('rooms_room_type_id_fk')
      ) {
        throw new BadRequestException(
          'There is no room type with the provided id'
        );
      }
      throw new BadRequestException(
        e.message ?? 'Error occurred while adding this room'
      );
    }
  }

  async updateById(accountId: string, id: string, body: DataAddRequestPayload) {
    const isExisted = await this.repository.existsById(id);
    if (!isExisted) {
      throw new BadRequestException('Room does not found with the provided id');
    }
    const data = await this.repository.findById(id);
    if (data === undefined) {
      throw new BadRequestException('This room is already deleted or disabled');
    }
    try {
      const roomUpdated = await this.repository.updateById(accountId, id, body);

      await this.histService.createNew(roomUpdated);
      return roomUpdated;
    } catch (e) {
      this.logger.error(e);
      if (
        e.message.includes('constraint') &&
        e.message.includes('rooms_room_type_id_fk')
      ) {
        throw new BadRequestException(
          'There is no room type with the provided id'
        );
      }
      throw new BadRequestException(
        e.message ?? 'Error occurred while updating this room'
      );
    }
  }

  async disableById(accountId: string, id: string): Promise<any> {
    const isExisted = await this.repository.existsById(id);
    if (!isExisted) {
      throw new BadRequestException('Room does not found with the provided id');
    }
    const isDisabled = await this.repository.checkIfRoomIsDisabledById(id);
    if (isDisabled) {
      throw new BadRequestException('This room is already disabled');
    }
    const isDeleted = await this.repository.checkIfRoomIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('This room is already deleted, can not disable');
      }
    const room = await this.repository.disableById(accountId, id);
    await this.histService.createNew(room);
    return room;
  }

  async getDisabledRooms(search: string): Promise<Rooms[]> {
    try {
      return await this.repository.findDisabledRooms(search);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'An error occurred while getting disabled rooms'
      );
    }
  }

  async handleRestoreDisabledRoomById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room does not found with the provided id'
        );
      }
      const isDeleted = await this.repository.checkIfRoomIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('This room is already deleted');
      }
      const isDisabled = await this.repository.checkIfRoomIsDisabledById(id);
      if (!isDisabled) {
        throw new BadRequestException(
          'This room ID is now active. Cannot restore it'
        );
      }
      const room = await this.repository.restoreDisabledRoomById(accountId, id);
      await this.histService.createNew(room);
      return room;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ??
          'Error occurred while restore the disabled status of this room'
      );
    }
  }

  async deleteById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room does not found with the provided id'
        );
      }
      const isDeleted = await this.repository.checkIfRoomIsDeletedById(id);
      if (isDeleted) {
        throw new BadRequestException('This room is already deleted');
      }
      const device = await this.repository.deleteById(accountId, id);
      await this.histService.createNew(device);
      return device;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getDeletedRooms(search: string): Promise<Rooms[]> {
    try {
      return await this.repository.findDeletedRooms(search);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'An error occurred while getting deleted rooms'
      );
    }
  }

  async handleRestoreDeletedRoomById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room does not found with the provided id'
        );
      }
      const isDisabled = await this.repository.checkIfRoomIsDisabledById(id);
      if (isDisabled) {
        throw new BadRequestException('This room is already disabled');
      }
      const isDeleted = await this.repository.checkIfRoomIsDeletedById(id);
      if (!isDeleted) {
        throw new BadRequestException(
          'This room ID is now active. Cannot restore it'
        );
      }

      const room = await this.repository.restoreDeletedRoomById(accountId, id);
      await this.histService.createNew(room);
      return room;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  getAllWithoutPagination(): Promise<Rooms[]> {
    try {
      return this.repository
        .createQueryBuilder('rooms')
        .where('rooms.disabled_at IS NULL')
        .andWhere('rooms.deleted_at IS NULL')
        .getMany();
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'An error occurred while adding this room'
      );
    }
  }

  getRoomsFilterByNameAndType(payload: ChooseBookingRoomFilterPayload) {
    return this.repository.filterByNameAndType(payload);
  }
}
