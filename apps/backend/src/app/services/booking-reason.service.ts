import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { BookingReasonRepository } from '../repositories/booking-reason.repository';
import { BookingReasonHistService } from './booking-reason-hist.service';
import { PaginationParams } from '../controllers/pagination.model';
import { BookingReason } from '../models/booking-reason.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { BookingReasonUpdateRequestPayload } from '../payload/request/booking-reason.request.payload';


@Injectable()
export class BookingReasonService {
  private readonly logger = new Logger(BookingReasonService.name);

  constructor(
    private readonly repository: BookingReasonRepository,
    private readonly histService: BookingReasonHistService
  ) {}

  async getRoomTypesWithPagination(
    pagination: PaginationParams
  ): Promise<Pagination<BookingReason>> {
    try {
      return await this.repository.findByPagination(pagination);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async deleteBookingReasonById(accountId: string, id: string) {
    try {
      return await this.repository.deleteById(accountId, id);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  getDeletedReasons(search: string) {
    try {
      return this.repository.findDeletedByPagination(search);
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
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

  async updateBookingReasonById(
    accountId: string,
    updatePayload: BookingReasonUpdateRequestPayload,
    id: string
  ) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Room type does not found with the provided id'
        );
      }
      const bookingReason = await this.repository.updateById(accountId, updatePayload, id);
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
