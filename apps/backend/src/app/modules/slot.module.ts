import { Module } from '@nestjs/common';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { SlotRepository } from '../repositories/slot.repository';
import { SlotController } from '../controllers/slots.controller';
import { SlotService } from '../services/slot.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([SlotRepository])],
  controllers: [SlotController],
  providers: [SlotService],
  exports: [SlotService],
})
export class SlotModule {}
