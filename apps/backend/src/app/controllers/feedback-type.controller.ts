import { Controller, Get, Post } from '@nestjs/common';
import { FeedbackTypeService } from '../services';

@Controller('/v1/feedback-types')
export class FeedbackTypeController {
  constructor(private readonly service: FeedbackTypeService) {}

  @Get()
  getAllFeedbackTypes() {
    return;
  }
}
