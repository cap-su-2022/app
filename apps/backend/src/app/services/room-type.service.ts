import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PaginationParams } from '../controllers/pagination.model';
import { RoomTypeRepository } from '../repositories/room-type.repository';
import { RoomTypeAddRequestPayload } from '../payload/request/room-type-add.request.payload';
import { RoomType } from '../models/room-type.entity';
import { RoomTypeUpdateRequestPayload } from '../payload/request/room-type-update.request.payload';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class RoomTypeService {
  private readonly logger = new Logger(RoomTypeService.name);

  constructor(private readonly repository: RoomTypeRepository) {}

  async getRoomTypesWithPagination(
    pagination: PaginationParams
  ): Promise<Pagination<RoomType>> {
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

  async updateRoomTypeById(
    accountId: string,
    updatePayload: RoomTypeUpdateRequestPayload,
    id: string
  ) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room type does not found with the provided id'
        );
      }
      return await this.repository.updateById(accountId, updatePayload);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async disableRoomTypeById(accountId: string, id: string) {
    try {
      return await this.repository.disableById(accountId, id);
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

  async restoreDeletedRoomTypeById(accountId: string, id: string) {
    try {
      const isExisted = this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room type does not exist with the provided id'
        );
      }
      return await this.repository.restoreDisabledById(accountId, id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async restoreDisabledRoomTypeById(accountId: string, id: string) {
    try {
      return await this.repository.restoreDisabledById(accountId, id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  deleteRoomTypeById(accountId: string, id: string) {
    try {
      return this.repository.deleteById(accountId, id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async addRoomType(
    accountId: string,
    addRoomType: RoomTypeAddRequestPayload
  ): Promise<RoomType> {
    try {
      return await this.repository.save({
        createdBy: accountId,
        name: addRoomType.name,
        description: addRoomType.description,
        createdAt: new Date(),
        updatedBy: accountId,
        updatedAt: new Date(),
      });
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }
}
