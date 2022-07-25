import { Injectable } from '@nestjs/common';
import { FeedbackHistRepository } from '../repositories';

@Injectable()
export class FeedbackHistService {
  constructor(private readonly repository: FeedbackHistRepository) {}
}
