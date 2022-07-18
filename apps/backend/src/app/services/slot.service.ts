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
      if (!params.search) {
        return this.repository.findAll();
      }
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
}
