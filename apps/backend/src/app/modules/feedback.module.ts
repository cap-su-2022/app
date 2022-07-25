import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import {
  FeedbackHistService,
  FeedbackService,
  KeycloakService,
} from '../services';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { FeedbackHistRepository, FeedbackRepository } from '../repositories';
import { FeedbackController } from '../controllers/feedback.controller';
import ConfigModule from './global/config.module';
import { AccountsModule } from './accounts.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AccountsModule,
    TypeOrmExModule.forCustomRepository([
      FeedbackRepository,
      FeedbackHistRepository,
    ]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService, KeycloakService, FeedbackHistService],
  exports: [FeedbackHistService, FeedbackService],
})
export class FeedbackModule {}
