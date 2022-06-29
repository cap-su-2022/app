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
  ): Promise<Pagination<Slot>> {
    try {
      return await this.repository.findByPagination(params);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
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
}
