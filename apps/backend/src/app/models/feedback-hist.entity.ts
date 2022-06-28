import { Entity } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity('feedback_hist')
export class FeedbackHist extends BaseEntity {}
