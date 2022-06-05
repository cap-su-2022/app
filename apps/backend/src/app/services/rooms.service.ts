import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {AddRoomRequest} from '@app/models';
import {UpdateResult} from 'typeorm';
import {UpdateRoomRequest} from '@app/models';
import {Rooms} from '../models/rooms.entity';
import {RoomsRepository} from '../repositories/rooms.repository';
import {RoomsRequestPayload} from '../payload/request/rooms.payload';
import {RoomsResponsePayload} from '../payload/response/rooms.payload';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(private readonly repository: RoomsRepository) {
  }

  async add(room: AddRoomRequest): Promise<Rooms> {
    try {
      return await this.repository.save(room, {
        transaction: true,
      });
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('An error occurred while adding this room');
    }
  }

  async findById(id: string): Promise<Rooms> {
    return this.repository.findOneOrFail(id);
  }

  async getAll(request: RoomsRequestPayload): Promise<RoomsResponsePayload> {
    const offset = request.size * (request.page - 1);
    const limit = request.size;

    const queryResult = await this.repository
      .searchRoom({
        search: request.search,
        offset: offset,
        limit: limit,
        direction: request.sort,
      })
      .catch((e) => {
        this.logger.error(e);
        throw new BadRequestException('One or more parameters is invalid');
      });

    const total = await this.repository.getSize().catch((e) => {
      this.logger.error(e);
      throw new BadRequestException('One or more parameters is invalid');
    });
    const totalPage = Math.ceil(total / request.size);

    return {
      data: queryResult,
      currentPage: request.page,
      totalPage: totalPage,
      size: total,
    };
  }

  async getDeletedRooms(): Promise<Rooms[]> {
    return await this.repository.findDeletedRooms();
  }

  async getDisabledRooms() {
    const data = await this.repository.findDisabledRooms();
    return data;
  }

  getAllWithoutPagination(): Promise<Rooms[]> {
    return this.repository.createQueryBuilder('rooms')
      .where("rooms.is_disabled = false")
      .andWhere("rooms.is_deleted = false")
      .getMany();
  }

  async updateById(id: string, body: UpdateRoomRequest): Promise<UpdateResult> {
    let room;

    try {
      room = await this.repository.findOneOrFail({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new BadRequestException("Room doesn't exist with the provided id");
    }

    try {
      return this.repository.save(
        {
          ...room,
          ...body,
        },
        {
          transaction: true,
        }
      );
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Error occurred while adding this room');
    }
  }

  async disableById(id: string): Promise<any> {
    try {
      const result = await this.repository.disableById(id);
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

  async deleteById(id: string) {
    try {
      const result = await this.repository.deleteById(id);
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
}
