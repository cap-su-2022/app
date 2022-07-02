import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AddRoomRequest, UpdateRoomRequest } from '@app/models';
import { UpdateResult } from 'typeorm';
import { Rooms } from '../models';
import { RoomsRepository } from '../repositories';
import { RoomsRequestPayload } from '../payload/request/rooms.payload';
import { RoomsResponsePayload } from '../payload/response/rooms.payload';
import { KeycloakUserInstance } from '../dto/keycloak.user';
import { Direction } from '../models/search-pagination.payload';
import { ChooseBookingRoomFilterPayload } from '../payload/request/choose-booking-room-filter.payload';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { RoomsPaginationParams } from '../controllers/rooms-pagination.model';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(private readonly repository: RoomsRepository) {}

  async add(user: KeycloakUserInstance, room: AddRoomRequest): Promise<Rooms> {
    try {
      const isExisted = await this.repository.isExistedByName(room.name);
      if (isExisted) {
        throw new BadRequestException('This room is already existed');
      }

      const addedRoom = await this.repository.save(
        {
          createdBy: user.account_id,
          updatedBy: user.account_id,
          ...room,
        },
        {
          transaction: true,
        }
      );

      return addedRoom;
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
      const data = await this.repository.findDisabledRooms(search);
      return data;
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

  async updateById(accountId:string, id: string, body: UpdateRoomRequest): Promise<void> {
    let room;

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

    try {
      await this.repository.save(
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
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Error occurred while updating this room');
    }
  }

  async disableById(accountId: string, id: string): Promise<any> {
    try {
      const result = await this.repository.disableById(accountId, id);
      if (result.affected < 1) {
        throw new BadRequestException(
          "Room doesn't exist with the provided id"
        );
      }
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Error occurred while disabling this room');
    }
  }

  async handleRestoreDeletedRoomById(id: string) {
    try {
      const result = await this.repository.restoreDeletedRoomById(id);
      if (result.affected < 1) {
        throw new BadRequestException(
          "Room doesn't exist with the provided id"
        );
      }
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'Error occurred while restore the delete status of this room'
      );
    }
  }

  async handleRestoreDisabledRoomById(id: string) {
    try {
      const result = await this.repository.restoreDisabledRoomById(id);
      if (result.affected < 1) {
        throw new BadRequestException(
          "Room doesn't exist with the provided id"
        );
      }
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(
        'Error occurred while restore the disabled status of this room'
      );
    }
  }

  async deleteById(accountId: string, id: string) {
    try {
      const result = await this.repository.deleteById(accountId, id);
      if (result.affected < 1) {
        throw new BadRequestException(
          "Room doesn't exist with the provided id"
        );
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
