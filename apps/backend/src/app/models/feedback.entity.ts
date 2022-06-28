import { Entity } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity('feedback')
export class Feedback extends BaseEntity {}
