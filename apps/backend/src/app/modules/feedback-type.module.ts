import { Module } from '@nestjs/common';
import { FeedbackTypeController } from '../controllers/feedback-type.controller';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { FeedbackTypeService } from '../services';
import { FeedbackTypeRepository } from '../repositories';

@Module({
  providers: [FeedbackTypeService],
  exports: [FeedbackTypeService],
  imports: [TypeOrmExModule.forCustomRepository([FeedbackTypeRepository])],
  controllers: [FeedbackTypeController],
})
export class FeedbackTypeModule {}
