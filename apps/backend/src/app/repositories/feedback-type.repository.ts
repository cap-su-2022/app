import { Repository } from 'typeorm';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { FeedbackType } from '../models/feedback-type.entity';

@CustomRepository(FeedbackType)
export class FeedbackTypeRepository extends Repository<FeedbackType> {}
