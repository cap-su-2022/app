import { Module } from '@nestjs/common';
import { RoomTypeService } from '../services/room-type.service';
import { RoomTypeController } from '../controllers/room-type.controller';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { RoomType } from '../models/room-type.entity';
import { RoomTypeRepository } from '../repositories/room-type.repository';
import { KeycloakService, RoomsService } from '../services';
import ConfigModule from './global/config.module';
import { HttpModule } from '@nestjs/axios';
import { AccountsModule } from './accounts.module';
import { RoomTypeHistService } from '../services/room-type-hist.service';
import { RoomTypeHistRepository } from '../repositories/room-type-hist.repository';
import { RoomsModule } from './rooms.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AccountsModule,
    RoomsModule,
    TypeOrmExModule.forCustomRepository([
      RoomTypeRepository,
      RoomTypeHistRepository,
    ]),
  ],
  controllers: [RoomTypeController],
  exports: [
    RoomTypeService,
    RoomTypeHistService,
  ],
  providers: [
    RoomTypeService,
    KeycloakService,
    RoomTypeHistService,
  ],
})
export class RoomTypeModule {}
