import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SlotRepository } from '../repositories/slot.repository';
import { PaginationParams } from '../controllers/pagination.model';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Slot } from '../models/slot.entity';
import { BookingRoomService } from './booking-room.service';

@Injectable()
export class SlotService {
  private readonly logger = new Logger(SlotService.name);

  constructor(
    private readonly repository: SlotRepository,
    // private readonly bookingRoomService: BookingRoomService
  ) {}

  async getAllByPagination(
    params: PaginationParams
  ): Promise<Pagination<Slot> | Slot[]> {
    try {
      if (!params || !params.page) {
        return await this.repository.findAll();
      } else {
        return await this.repository.findByPagination(params);
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getSlotNames() {
    try {
      return await this.repository.findSlotNames();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getNumOfSlot(id: string) {
    try {
      const slot = await this.repository.getNumOfSlot(id);
      return slot;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('One or more parameters is invalid');
    }
  }

  async getById(id: string) {
    try {
      return await this.repository.findById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  getAll(): Promise<Slot[]> {
    return this.repository.findAll();
  }

  async addNewSlot(
    accountId: string,
    payload: { name: string; slotNum: number; description: string }
  ) {
    try {
      const isHaveSlotSameNameActive =
        await this.repository.isHaveSlotSameNameActive(payload.name);
      if (isHaveSlotSameNameActive) {
        throw new BadRequestException(
          `Already have slot with name '${payload.name}' active. Try other name or delete slot have name '${payload.name}' before add new`
        );
      }
      const slot = await this.repository.addNew(accountId, payload);
      // await this.histService.createNew(slot);
      return slot;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async deleteSlotById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Slot does not found with the provided id'
        );
      }
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException('This slot is already deleted');
      }

      // const listRequestBySlot = await this.bookingRoomService.getBookingBySlot(
      //   id
      // );
      // if (listRequestBySlot?.length > 0) {
      //   throw new BadRequestException(
      //     'Chưa xử lý vụ delete slot đã có người book'
      //   );
      // }

      const slot = await this.repository.deleteById(accountId, id);
      // await this.histService.createNew(slot);
      return slot;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async getDeletedSlots(search: string) {
    try {
      const slot = await this.repository.findDeletedByPagination(search);
      return slot;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async restoreDeletedSlotById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Slot does not found with the provided id'
        );
      }
      const data = await this.repository.findById(id);
      if (data !== undefined) {
        throw new BadRequestException(
          'This slot ID is now active. Cannot restore it'
        );
      } else {
        const isHaveSlotSameNameActive =
          await this.repository.isHaveSlotSameNameActive(data.name);
        if (isHaveSlotSameNameActive) {
          throw new BadRequestException(
            `Already have slot with name '${data.name}' active.
            Try other name or delete slot have name '${data.name}' before restore`
          );
        }
      }

      const roomType = await this.repository.restoreDeletedById(accountId, id);
      // await this.histService.createNew(roomType);
      return roomType;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
