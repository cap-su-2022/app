import { Entity } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity('feedback_type')
export class FeedbackType extends BaseEntity {}
