import { Module } from '@nestjs/common';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { SlotRepository } from '../repositories/slot.repository';
import { SlotController } from '../controllers/slots.controller';
import { SlotService } from '../services/slot.service';
import { KeycloakService } from '../services';
import { HttpModule } from '@nestjs/axios';
import ConfigModule from './global/config.module';
import { AccountsModule } from './accounts.module';


@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AccountsModule,
    TypeOrmExModule.forCustomRepository([SlotRepository]),
  ],
  controllers: [SlotController],
  providers: [SlotService, KeycloakService],
  exports: [SlotService],
})
export class SlotModule {}
