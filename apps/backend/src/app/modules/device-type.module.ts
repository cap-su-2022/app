import { Module } from '@nestjs/common';
import { DeviceTypeController } from '../controllers/device-type.controller';
import { DeviceTypeService } from '../services/device-type.service';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { DeviceTypeRepository } from '../repositories/device-type.repository';
import { AccountsModule } from './accounts.module';
import ConfigModule from './global/config.module';
import { HttpModule } from '@nestjs/axios';
import { KeycloakService } from '../services';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AccountsModule,
    TypeOrmExModule.forCustomRepository([DeviceTypeRepository]),
  ],
  controllers: [DeviceTypeController],
  exports: [DeviceTypeService],
  providers: [DeviceTypeService, KeycloakService],
})
export class DeviceTypeModule {}
