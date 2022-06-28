import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { BookingReasonRepository } from '../repositories/booking-reason.repository';
import { BookingReasonHistService } from './booking-reason-hist.service';
import { PaginationParams } from '../controllers/pagination.model';
import { BookingReason } from '../models/booking-reason.entity';

@Injectable()
export class BookingReasonService {
  private readonly logger = new Logger(BookingReasonService.name);

  constructor(
    private readonly repository: BookingReasonRepository,
    private readonly histService: BookingReasonHistService
  ) {}

  getAllByPagination(payload: PaginationParams) {
    return this.repository.findByPagination(payload);
  }

  async createNewBookingReason(
    accountId: string,
    payload: BookingReason
  ): Promise<BookingReason> {
    try {
      const bookingReason = await this.repository.createNew(accountId, {
        name: payload.name,
        description: payload.description,
      });

      await this.histService.createNew(bookingReason);

      return bookingReason;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async getBookingReasonById(id: string): Promise<BookingReason> {
    try {
      return await this.repository.findById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
