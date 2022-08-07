import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import {
  FeedbackHistService,
  FeedbackService,
  KeycloakService,
} from '../services';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { FeedbackHistRepository, FeedbackRepository } from '../repositories';
import { FeedbackController } from '../controllers';
import ConfigModule from './global/config.module';
import { AccountsModule } from './accounts.module';
import { NotificationModule } from './notification.module';
import { FeedbackGateway } from '../gateway/feedback.gateway';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AccountsModule,
    NotificationModule,
    TypeOrmExModule.forCustomRepository([
      FeedbackRepository,
      FeedbackHistRepository,
    ]),
  ],
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
    KeycloakService,
    FeedbackHistService,
    FeedbackGateway,
  ],
  exports: [FeedbackHistService, FeedbackService],
})
export class FeedbackModule {}
