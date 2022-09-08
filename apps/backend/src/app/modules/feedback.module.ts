import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import {
  FeedbackService,
  KeycloakService,
} from '../services';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { FeedbackRepository } from '../repositories';
import { FeedbackController } from '../controllers';
import ConfigModule from './global/config.module';
import { AccountsModule } from './accounts.module';
import { NotificationModule } from './notification.module';
import { FeedbackGateway } from '../gateway/feedback.gateway';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    forwardRef(() => AccountsModule),
    forwardRef(() => NotificationModule),
    TypeOrmExModule.forCustomRepository([
      FeedbackRepository,
    ]),
  ],
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
    KeycloakService,
    FeedbackGateway,
  ],
  exports: [FeedbackService],
})
export class FeedbackModule {}
