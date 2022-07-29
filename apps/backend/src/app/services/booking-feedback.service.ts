import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PaginationParams } from '../controllers/pagination.model';
import { Feedback } from '../models';
import { BookingFeedbackSendRequestPayload } from '../payload/request/booking-feedback-send.request.payload';
import { BookingFeedbackRepository } from '../repositories/booking-feedback.repository';

@Injectable()
export class BookingFeedbackService {
  private readonly logger = new Logger(BookingFeedbackService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly repository: BookingFeedbackRepository,
  ) {}

  getAllFeedbacks(param: PaginationParams) {
    try {
      return this.repository.findByPagination(param);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async addNewFeedback(accountId: string, payload: BookingFeedbackSendRequestPayload) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const feedback = await this.repository.addNew(
        accountId,
        payload,
        queryRunner
      );

      await queryRunner.commitTransaction();
      return feedback;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    }
  }

  async getFeedbackById(id: string): Promise<Feedback> {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Feedback does not found with the provided id'
        );
      }
      const data = await this.repository.findById(id);
      return data;
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

}
