import { Injectable } from '@nestjs/common';
import { Feedback, FeedbackHist } from '../models';
import { FeedbackHistRepository } from '../repositories';

@Injectable()
export class FeedbackHistService {
  constructor(private readonly repository: FeedbackHistRepository) {}
  async createNew(feedback: Feedback): Promise<FeedbackHist> {
    return this.repository.createNew(feedback);
  }
}
