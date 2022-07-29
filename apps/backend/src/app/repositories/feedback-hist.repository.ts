import { QueryRunner, Repository } from 'typeorm';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Feedback } from '../models';
import { FeedbackHist } from '../models/feedback-hist.entity';

@CustomRepository(FeedbackHist)
export class FeedbackHistRepository extends Repository<FeedbackHist> {
  async createNew(
    payload: Feedback,
    queryRunner: QueryRunner
  ): Promise<FeedbackHist> {
    const feedbackId = payload.id;
    delete payload.id;
    const data = await queryRunner.manager.save(FeedbackHist, {
      feedbackId: feedbackId,
      ...payload,
    });
    return data;
  }
}
