import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SlotRepository } from '../repositories/slot.repository';
import { PaginationParams } from '../controllers/pagination.model';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Slot } from '../models/slot.entity';

@Injectable()
export class SlotService {
  private readonly logger = new Logger(SlotService.name);

  constructor(private readonly repository: SlotRepository) {}

  async getAllByPagination(
    params: PaginationParams
  ): Promise<Pagination<Slot> | Slot[]> {
    try {
      return await this.repository.findByPagination(params);
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
      const isHaveSlotSameNameActive = this.repository.isHaveSlotSameNameActive(
        payload.name
      );
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

      const slot = await this.repository.deleteById(accountId, id);
      // await this.histService.createNew(slot);
      return slot;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }
}
