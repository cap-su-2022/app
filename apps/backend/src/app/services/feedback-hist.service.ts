import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Feedback, FeedbackHist } from '../models';
import { FeedbackHistRepository } from '../repositories';

@Injectable()
export class FeedbackHistService {
  constructor(private readonly repository: FeedbackHistRepository) {}
  async createNew(feedback: Feedback, queryRunner: QueryRunner): Promise<FeedbackHist> {
    return this.repository.createNew(feedback, queryRunner);
  }
}
