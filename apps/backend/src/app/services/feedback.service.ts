import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PaginationParams } from '../controllers/pagination.model';
import { Feedback } from '../models';
import { FeedbackResolveRequestPayload } from '../payload/request/feedback-resolve.request.payload';
import { FeedbackSendRequestPayload } from '../payload/request/feedback-send.request.payload';
import { FeedbackRepository } from '../repositories';
import { FeedbackHistService } from './feedback-hist.service';

@Injectable()
export class FeedbackService {
  private readonly logger = new Logger(FeedbackService.name);

  constructor(
    private readonly repository: FeedbackRepository,
    private readonly histService: FeedbackHistService
  ) {}

  getAllFeedbacks(param: PaginationParams) {
    try {
      return this.repository.findByPagination(param);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async addNewFeedback(
    accountId: string,
    payload: FeedbackSendRequestPayload
  ) {
    try {
      const feedback = await this.repository.addNew(accountId, payload);
      await this.histService.createNew(feedback);
      return feedback;
    } catch (e) {
      this.logger.error(e);
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

  async resolveFeedbackById(
    accountId: string,
    id: string,
    payload: FeedbackResolveRequestPayload
  ) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Feedback does not found with the provided id'
        );
      }
      const data = await this.repository.findOneOrFail({
        where: {
          id: id,
        }
      });
      if(data.status === "RESOLVED"){
        throw new BadRequestException(
          'Feedback was resolved!'
        );
      }
      const feedback = await this.repository.resolveById(
        accountId,
        id,
        payload
      );
      await this.histService.createNew(feedback);
      return feedback;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async rejectFeedbackById(
    accountId: string,
    id: string,
  ) {
    try {
      const isExisted = await this.repository.existsById(id);
      if (!isExisted) {
        throw new BadRequestException(
          'Feedback does not found with the provided id'
        );
      }
      const data = await this.repository.findOneOrFail({
        where: {
          id: id,
        }
      });
      if(data.status === "RESOLVED"){
        throw new BadRequestException(
          'Feedback was resolved!'
        );
      }
      const feedback = await this.repository.rejectById(
        accountId,
        id,
      );
      await this.histService.createNew(feedback);
      return feedback;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }
}
