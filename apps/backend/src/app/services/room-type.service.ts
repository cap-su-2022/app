import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PaginationParams } from '../controllers/pagination.model';
import { RoomTypeRepository } from '../repositories/room-type.repository';
import { MasterDataAddRequestPayload } from '../payload/request/master-data-add.request.payload';
import { RoomType } from '../models/room-type.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

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

  getRoomTypeNames() {
    try {
      return this.repository.findRoomTypeName();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getRoomTypeById(id: string): Promise<RoomType> {
    try {
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException(
          'This room is already deleted or disabled'
        );
      }
      return data;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async updateRoomTypeById(
    accountId: string,
    updatePayload: MasterDataAddRequestPayload,
    id: string
  ) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room type does not found with the provided id'
        );
      }
      return await this.repository.updateById(id, accountId, updatePayload);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  // async disableRoomTypeById(accountId: string, id: string): Promise<any> {
  //   try {
  //     const result = await this.repository.disableById(accountId, id);
  //     if (result.affected < 1) {
  //       throw new BadRequestException(
  //         "Room doesn't exist with the provided id"
  //       );
  //     }
  //   } catch (e) {
  //     this.logger.error(e.message);
  //     throw new BadRequestException(e.message);
  //   }
  // }

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
      return await this.repository.restoreDeletedById(accountId, id);
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

  async deleteRoomTypeById(accountId: string, id: string) {
    try {
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException(
          'This room type is already deleted or disabled'
        );
      } else {
        return this.repository.deleteById(accountId, id);
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async permanentDeleteRoomTypeById(id: string) {
    try {
      const data = await this.repository.findById(id);
      console.log("DATA NE: ", data)
      if (data !== undefined) {
        throw new BadRequestException(
          'Please delete this room type after permanently delete'
        );
      } else {
        return this.repository.permanantDeleteById(id);
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async addRoomType(
    accountId: string,
    addRoomType: MasterDataAddRequestPayload
  ): Promise<RoomType> {
    try {
      return await this.repository.save({
        createdBy: accountId,
        name: addRoomType.name.trim(),
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
