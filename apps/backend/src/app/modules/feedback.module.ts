import { Module } from '@nestjs/common';
import { FeedbackHistService, FeedbackService } from '../services';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { FeedbackHistRepository, FeedbackRepository } from '../repositories';
import { FeedbackController } from '../controllers/feedback.controller';

@Module({
  providers: [FeedbackService, FeedbackHistService],
  exports: [FeedbackHistService, FeedbackService],
  imports: [
    TypeOrmExModule.forCustomRepository([
      FeedbackRepository,
      FeedbackHistRepository,
    ]),
  ],
  controllers: [FeedbackController],
})
export class FeedbackModule {}
