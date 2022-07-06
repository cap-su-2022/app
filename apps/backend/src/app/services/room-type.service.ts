import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PaginationParams } from '../controllers/pagination.model';
import { RoomTypeRepository } from '../repositories/room-type.repository';
import { MasterDataAddRequestPayload } from '../payload/request/master-data-add.request.payload';
import { RoomType } from '../models/room-type.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { RoomTypeHistService } from './room-type-hist.service';

@Injectable()
export class RoomTypeService {
  private readonly logger = new Logger(RoomTypeService.name);

  constructor(
    private readonly repository: RoomTypeRepository,
    private readonly histService: RoomTypeHistService
  ) {}

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
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException(
          'This room is already deleted or disabled'
        );
      }
      const roomType = await this.repository.updateById(
        id,
        accountId,
        updatePayload
      );
      await this.histService.createNew(roomType);
      return roomType;
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

  // async getDisabledRoomTypes(search: string) {
  //   try {
  //     const roomTypePagination = await this.repository.findDisabledByPagination(search);
  //     console.log("AAAAAAAAAAAAA", roomTypePagination)
  //     // await this.histService.createNew(roomTypePagination);
  //     return roomTypePagination;
  //   } catch (e) {
  //     this.logger.error(e.message);
  //     throw new BadRequestException(e.message);
  //   }
  // }

  async getDeletedRoomTypes(search: string) {
    try {
      const roomType = await this.repository.findDeletedByPagination(search);
      return roomType;
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
      const data = await this.repository.findById(id);
      if (data !== undefined) {
        throw new BadRequestException(
          'This room type ID is now active. Cannot restore it'
        );
      }
      const roomType = await this.repository.restoreDeletedById(accountId, id);
      await this.histService.createNew(roomType);
      return roomType;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  // async restoreDisabledRoomTypeById(accountId: string, id: string) {
  //   try {
  //     const roomType = await this.repository.restoreDisabledById(accountId, id);
  //     // await this.histService.createNew(roomType);
  //     return roomType;
  //   } catch (e) {
  //     this.logger.error(e.message);
  //     throw new BadRequestException(e.message);
  //   }
  // }

  async deleteRoomTypeById(accountId: string, id: string) {
    try {
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException(
          'This room type is already deleted or disabled'
        );
      } else {
        const roomType = await this.repository.deleteById(accountId, id);
        await this.histService.createNew(roomType);
        return roomType;
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async permanentDeleteRoomTypeById(id: string) {
    try {
      const data = await this.repository.findById(id);
      if (data !== undefined) {
        throw new BadRequestException(
          'Please delete this room type after permanently delete'
        );
      } else {
        await this.histService.deleteAllHist(id);
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
      const roomType = await this.repository.save({
        createdBy: accountId,
        name: addRoomType.name.trim(),
        description: addRoomType.description,
        createdAt: new Date(),
        updatedBy: accountId,
        updatedAt: new Date(),
      });

      await this.histService.createNew(roomType);
      return roomType;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }
}
