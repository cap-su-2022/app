import { Controller, Get, Post } from '@nestjs/common';
import { FeedbackService } from '../services';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enum/roles.enum';

@Controller('/v1/feedbacks')
export class FeedbackController {
  constructor(private readonly service: FeedbackService) {}

  @Get()
  getAllFeedbacks() {
    return this.service.getAllFeedbacks();
  }

  @Post('send-feedback')
  @Roles(Role.APP_STAFF, Role.APP_LIBRARIAN)
  sendFeedback() {
    return;
  }
}
