import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { PaginationParams } from "../controllers/pagination.model";
import { RoomTypeRepository } from "../repositories/room-type.repository";
import { RoomTypeAddRequestPayload } from "../payload/request/room-type-add.request.payload";
import { RoomType } from "../models/room-type.entity";
import { RoomTypeUpdateRequestPayload } from "../payload/request/room-type-update.request.payload";

@Injectable()
export class RoomTypeService {

  private readonly logger = new Logger(RoomTypeService.name);

  constructor(private readonly repository: RoomTypeRepository) {
  }

  async getRoomTypesWithPagination(pagination: PaginationParams): Promise<RoomType[]> {
    try {
      return await this.repository.findRoomTypesByPagination(pagination);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getRoomTypeById(id: string): Promise<RoomType> {
    try {
      return await this.repository.findById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  updateRoomTypeById(updatePayload: RoomTypeUpdateRequestPayload, id: string) {
    try {
      return this.repository.updateById(updatePayload);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  disableRoomTypeById(id: string) {
    try {
      return this.repository.disableById(id, '');
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  getDisabledRoomTypes(search: string) {
    try {
      return this.repository.findDisabledByPagination(search);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  getDeletedRoomTypes(search: string) {
    try {
      return this.repository.findDeletedByPagination(search);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  restoreDeletedRoomTypeById(id: string) {
    try {
      return this.repository.restoreDisabledById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  restoreDisabledRoomTypeById(id: string) {
    try {
      return this.repository.restoreDisabledById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  deleteRoomTypeById(id: string) {
    try {
      return this.repository.deleteById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async addRoomType(accountId: string, addRoomType: RoomTypeAddRequestPayload): Promise<RoomType> {
    try {
      return await this.repository.save({
        createdBy: accountId,
        name: addRoomType.name,
      })
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
