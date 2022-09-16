import { forwardRef, Module } from '@nestjs/common';
import { FeedbackTypeController } from '../controllers/feedback-type.controller';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { FeedbackTypeService } from '../services';
import { FeedbackTypeRepository } from '../repositories';
import { AccountsModule } from './accounts.module';
import { HttpModule } from '@nestjs/axios';
import { KeycloakService } from '../services';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => AccountsModule),
    TypeOrmExModule.forCustomRepository([FeedbackTypeRepository]),
  ],
  providers: [FeedbackTypeService, KeycloakService],
  exports: [FeedbackTypeService],
  controllers: [FeedbackTypeController],
})
export class FeedbackTypeModule {}
