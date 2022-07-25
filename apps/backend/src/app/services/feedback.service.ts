import { Injectable } from '@nestjs/common';
import { FeedbackRepository } from '../repositories';
import { FeedbackHistService } from './feedback-hist.service';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly repository: FeedbackRepository,
    private readonly histService: FeedbackHistService
  ) {}

  getAllFeedbacks() {
    return;
  }
}
