import { Repository } from 'typeorm';
import { CustomRepository } from '../decorators/typeorm-ex.decorator';
import { Feedback } from '../models/feedback.entity';

@CustomRepository(Feedback)
export class FeedbackRepository extends Repository<Feedback> {}
