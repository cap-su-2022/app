import {BadRequestException, Body, Injectable, Logger} from '@nestjs/common';
import {BookingReasonRepository} from '../repositories/booking-reason.repository';
import {BookingReasonHistService} from './booking-reason-hist.service';
import {PaginationParams} from '../controllers/pagination.model';
import {BookingReason} from '../models/booking-reason.entity';
import {MasterDataAddRequestPayload} from '../payload/request/master-data-add.request.payload';


@Injectable()
export class BookingReasonService {
  private readonly logger = new Logger(BookingReasonService.name);

  constructor(
    private readonly repository: BookingReasonRepository,
    private readonly histService: BookingReasonHistService
  ) {
  }

  async getBookingReasonTypesWithPagination(pagination: PaginationParams) {
    try {
      if (!pagination || !pagination.page) {
        return await this.repository.findAll();
      } else {
        return await this.repository.findByPagination(pagination);
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  getBookingReasonNames() {
    try {
      return this.repository.findBookingReasonName();
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }


  async getBookingReasonById(id: string): Promise<BookingReason> {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Booking reason does not found with the provided id'
        );
      }
      const result = await this.repository.findById(id);
      if (!result) {
        throw new BadRequestException(
          'This booking reason is already deleted'
        );
      }
      return result;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message ?? 'An error occurred while retrieving this booking reason');
    }
  }

  async createNewBookingReason(
    accountId: string,
    payload: MasterDataAddRequestPayload
  ): Promise<BookingReason> {
    const isExisted = await this.repository.isExistedByName(payload.name);
    if (isExisted) {
      throw new BadRequestException('Booking reason name is duplicated!');
    }
    try {
      const bookingReason = await this.repository.createNew(accountId, payload);

      await this.histService.createNew(bookingReason);
      return bookingReason;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async updateBookingReasonById(
    accountId: string,
    updatePayload: MasterDataAddRequestPayload,
    id: string
  ): Promise<BookingReason> {
    try {
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException('This reason already deleted!');
      }
      const isExisted = await this.repository.isExistedByName(updatePayload.name);
      if (isExisted) {
        throw new BadRequestException('Booking reason name is duplicated!');
      }
      const bookingReason = await this.repository.updateById(
        accountId,
        updatePayload,
        id
      );
      await this.histService.createNew(bookingReason);
      return bookingReason;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async deleteBookingReasonById(accountId: string, id: string) {
    try {
      const data = await this.repository.findById(id);
      if (data === undefined) {
        throw new BadRequestException('This reason is already deleted!');
      }
      const reason = await this.repository.deleteById(accountId, id);
      await this.histService.createNew(reason);
      return reason;
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

  async restoreDeletedReasonById(accountId: string, id: string) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'This reason does not exist with the provided id'
        );
      }
      const isActive = await this.repository.findById(id);
      if (isActive !== undefined) {
        throw new BadRequestException(
          'This reason ID is now active. Cannot restore it'
        );
      }
      const reason = await this.repository.restoreDeletedById(accountId, id);
      await this.histService.createNew(reason);
      return reason;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message ?? 'Error occurred while restore the deleted status of this boôking reason');
    }
  }

  async permanentlyDeleteReasonById(id: string) {
    try {
      const data = await this.repository.findById(id);
      if (data !== undefined) {
        throw new BadRequestException(
          'Please delete this reason after permanently delete'
        );
      } else {
        await this.histService.deleteAllHist(id);
        return this.repository.permanentlyDeleteById(id);
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
}
