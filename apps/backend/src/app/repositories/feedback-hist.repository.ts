import { Repository } from 'typeorm';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { FeedbackHist } from '../models/feedback-hist.entity';

@CustomRepository(FeedbackHist)
export class FeedbackHistRepository extends Repository<FeedbackHist> {}
