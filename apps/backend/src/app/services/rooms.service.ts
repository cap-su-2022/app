import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AddRoomRequest, UpdateRoomRequest } from '@app/models';
import { Rooms } from '../models';
import { RoomsRepository } from '../repositories';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { ChooseBookingRoomFilterPayload } from '../payload/request/choose-booking-room-filter.payload';
import { RoomsPaginationParams } from '../controllers/rooms-pagination.model';
import { RoomHistService } from './room-hist.service';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    private readonly repository: RoomsRepository,
    private readonly histService: RoomHistService
  ) {}

  async add(user: KeycloakUserInstance, room: AddRoomRequest): Promise<Rooms> {
    try {
      const isExisted = await this.repository.isExistedByName(room.name);
      if (isExisted) {
        throw new BadRequestException('This room is already existed');
      }
      if (room.isDisabled) {
        const addedRoom = await this.repository.save(
          {
            createdBy: user.account_id,
            updatedAt: new Date(),
            disabledBy: user.account_id,
            disabledAt: new Date(),
            ...room,
          },
          {
            transaction: true,
          }
        );
        await this.histService.createNew(addedRoom);
        return addedRoom;
      } else {
        const addedRoom = await this.repository.save(
          {
            createdBy: user.account_id,
            updatedAt: new Date(),
            updatedBy: user.account_id,
            ...room,
          },
          {
            transaction: true,
          }
        );

        await this.histService.createNew(addedRoom);
        return addedRoom;
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(
        e.message ?? 'An error occurred while adding this room'
      );
    }
  }

  async findById(id: string): Promise<Rooms> {
    try {
      const isExisted = await this.repository.isExistedById(id);
      if (!isExisted) {
        throw new BadRequestException('Room does not found with the id');
      }
      const result = await this.repository.findById(id);
      if (!result) {
        throw new BadRequestException('Room does not found with the id');
      }
      return result;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        e.message ?? 'An error occurred while retrieving this room'
      );
    }
  }

  async getAll(request: RoomsPaginationParams) {
    return await this.repository.searchRoom(request);
  }

  async getDeletedRooms(search: string): Promise<Rooms[]> {
    try {
      return await this.repository.findDeletedRooms(search);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'An error occurred while getting deleted rooms'
      );
    }
  }

  async getDisabledRooms(search: string): Promise<Rooms[]> {
    try {
      return await this.repository.findDisabledRooms(search);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'An error occurred while getting disabled rooms'
      );
    }
  }

  async getRoomsByRoomType(roomTypeId: string): Promise<Rooms[]> {
    try {
      return await this.repository.getRoomsByRoomType(roomTypeId);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'An error occurred while getting rooms by type ' + roomTypeId
      );
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
      throw new BadRequestException('An error occurred while adding this room');
    }
  }

  async updateById(
    accountId: string,
    id: string,
    body: UpdateRoomRequest
  ): Promise<void> {
    let room;
    if (
      body.name.length < 1 ||
      body.type.length < 1 ||
      body.description.length < 1
    ) {
      throw new BadRequestException('Fields cannot be left blank!');
    }
    try {
      room = await this.repository.findOneOrFail({
        where: {
          id: id,
        },
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Room doesn't exist with the provided id");
    }

    if (room.name !== body.name) {
      const isExisted = await this.repository.isExistedByName(body.name);
      if (isExisted) {
        throw new BadRequestException(
          'The room name you want to use is duplicated!'
        );
      }
    }
    const data = await this.repository.findById(id);
    if (data === undefined) {
      throw new BadRequestException('This room is already deleted or disabled');
    }

    try {
      const roomUpdated = await this.repository.save(
        {
          ...room,
          name: body.name.trim(),
          description: body.description,
          updatedBy: accountId,
          type: body.type,
        },
        {
          transaction: true,
        }
      );

      await this.histService.createNew(roomUpdated);
      return roomUpdated;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Error occurred while updating this room');
    }
  }

  async disableById(accountId: string, id: string): Promise<any> {
    const data = await this.repository.findById(id);
    if (data === undefined) {
      throw new BadRequestException('This room is already deleted or disabled');
    }
    try {
      const rooms = await this.repository.findDisabledRooms('');
      if (rooms.findIndex((room) => room.id === id) !== -1) {
        throw new BadRequestException('Room already disable!');
      }
      const result = await this.repository.disableById(accountId, id);
      if (result.affected < 1) {
        throw new BadRequestException(
          "Room doesn't exist with the provided id"
        );
      } else {
        const room = await this.repository.get(id);
        await this.histService.createNew(room);
        return room;
      }
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Error occurred while disabling this room');
    }
  }

  async handleRestoreDisabledRoomById(id: string) {
    try {
      const room = await this.repository.findOneOrFail({
        where: {
          id: id,
        },
      });
      if (
        room.deletedBy == null &&
        room.deletedAt == null &&
        room.disabledBy == null &&
        room.disabledAt == null
      ) {
        throw new BadRequestException('This room is active!');
      }
      const result = await this.repository.restoreDeletedRoomById(id);
      if (result.affected < 1) {
        throw new BadRequestException(
          "Room doesn't exist with the provided id"
        );
      } else {
        const room = await this.repository.get(id);
        await this.histService.createNew(room);
        return room;
      }
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'Error occurred while restore the disabled status of this room'
      );
    }
  }

  async handleRestoreDeletedRoomById(id: string) {
    try {
      const room = await this.repository.findOneOrFail({
        where: {
          id: id,
        },
      });
      if (
        room.disabledBy == null &&
        room.disabledAt == null &&
        room.disabledBy == null &&
        room.disabledAt == null
      ) {
        throw new BadRequestException('This room is active!');
      }
      const result = await this.repository.restoreDisabledRoomById(id);
      if (result.affected < 1) {
        throw new BadRequestException(
          "Room doesn't exist with the provided id"
        );
      } else {
        const room = await this.repository.get(id);
        await this.histService.createNew(room);
        return room;
      }
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'Error occurred while restore the delete status of this room'
      );
    }
  }

  async deleteById(accountId: string, id: string) {
    try {
      const rooms = await this.repository.findDisabledRooms('');
      if (rooms.findIndex((room) => room.id === id) !== -1) {
        throw new BadRequestException('Room already deleted!');
      }
      const result = await this.repository.deleteById(accountId, id);
      if (result.affected < 1) {
        throw new BadRequestException(
          "Room doesn't exist with the provided id"
        );
      } else {
        const room = await this.repository.get(id);
        await this.histService.createNew(room);
        return room;
      }
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Error occurred while deleting this room');
    }
  }

  async getRoomsName() {
    try {
      return await this.repository.findRoomNames();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  getRoomsFilterByNameAndType(payload: ChooseBookingRoomFilterPayload) {
    return this.repository.filterByNameAndType(payload);
  }
}
