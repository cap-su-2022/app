import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { AddRoomRequest, UpdateRoomRequest } from "@app/models";
import { UpdateResult } from "typeorm";
import { Rooms } from "../models";
import { RoomsRepository } from "../repositories";
import { RoomsRequestPayload } from "../payload/request/rooms.payload";
import { RoomsResponsePayload } from "../payload/response/rooms.payload";
import { KeycloakUserInstance } from "../dto/keycloak.user";
import { Direction } from "../models/search-pagination.payload";
import {ChooseBookingRoomFilterPayload} from "../payload/request/choose-booking-room-filter.payload";

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    private readonly repository: RoomsRepository
  ) {
  }

  async add(user: KeycloakUserInstance, room: AddRoomRequest): Promise<Rooms> {
    try {
      const isExisted = await this.repository.isExistedByName(room.name);
      if (isExisted) {
        throw new BadRequestException("This room is already existed");
      }

      const addedRoom = await this.repository.save({
        createdBy: user.account_id,
        updatedBy: user.account_id,
        ...room
      }, {
        transaction: true
      });

      return addedRoom;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message ?? "An error occurred while adding this room");
    }
  }


  async findById(id: string): Promise<Rooms> {
    try {
      const isExisted = await this.repository.isExistedById(id);
      if (!isExisted) {
        throw new BadRequestException("Room does not found with the id");
      }
      return await this.repository.findById(id);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message ?? "An error occurred while retrieving this room");
    }
  }

  async getAll(request: RoomsRequestPayload): Promise<RoomsResponsePayload> {
    const offset = request.size * (request.page - 1);
    const limit = request.size;

    const queryResult = await this.repository
      .searchRoom({
        search: request.search,
        offset: offset,
        limit: limit,
        direction: request.sort as Direction[]
      })
      .catch((e) => {
        this.logger.error(e);
        throw new BadRequestException("One or more parameters is invalid");
      });
    const total = await this.repository.getSize().catch((e) => {
      this.logger.error(e);
      throw new BadRequestException("One or more parameters is invalid");
    });

    const totalPage = Math.ceil(total / request.size);

    return {
      data: queryResult,
      currentPage: request.page,
      totalPage: totalPage,
      size: total
    };
  }

  async getDeletedRooms(search: string): Promise<Rooms[]> {
    try {
      return await this.repository.findDeletedRooms(search);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException("An error occurred while getting deleted rooms");
    }
  }

  async getDisabledRooms(search: string): Promise<Rooms[]> {
    try {
      const data = await this.repository.findDisabledRooms(search);
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException("An error occurred while getting disabled rooms");
    }
  }

  getAllWithoutPagination(): Promise<Rooms[]> {
    try {
      return this.repository.createQueryBuilder("rooms")
        .where("rooms.is_disabled = false")
        .andWhere("rooms.is_deleted = false")
        .getMany();
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException("An error occurred while adding this room");
    }
  }

  async updateById(id: string, body: UpdateRoomRequest): Promise<void> {
    let room;

    try {
      room = await this.repository.findOneOrFail({
        where: {
          id: id
        }
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException("Room doesn't exist with the provided id");
    }
    if (room.name !== body.name) {
      const isExisted = await this.repository.isExistedByName(body.name);
      if (isExisted) {
        throw new BadRequestException("The room name you want to use is duplicated!");
      }
    }


    try {
      await this.repository.save(
        {
          ...room,
          name: body.name,
          description: body.description,
          type: body.type
        },
        {
          transaction: true
        }
      );
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException("Error occurred while updating this room");
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
      throw new BadRequestException("Error occurred while disabling this room");
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
        "Error occurred while restore the delete status of this room"
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
        "Error occurred while restore the disabled status of this room"
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
      throw new BadRequestException("Error occurred while deleting this room");
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
