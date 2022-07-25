import { Injectable } from '@nestjs/common';
import { FeedbackTypeRepository } from '../repositories';

@Injectable()
export class FeedbackTypeService {
  constructor(private readonly repository: FeedbackTypeRepository) {}
}
