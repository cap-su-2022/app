import { forwardRef, Module } from '@nestjs/common';
import { DeviceTypeController } from '../controllers/device-type.controller';
import { DeviceTypeService } from '../services/device-type.service';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { DeviceTypeRepository } from '../repositories/device-type.repository';
import { AccountsModule } from './accounts.module';
import ConfigModule from './global/config.module';
import { HttpModule } from '@nestjs/axios';
import { KeycloakService } from '../services';
import { DeviceTypeHistRepository } from '../repositories/device-type-hist.repository';
import { DeviceTypeHistService } from '../services/device-type-hist.service';
import { DevicesModule } from './devices.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    forwardRef(() => DevicesModule),
    forwardRef(() => AccountsModule),

    TypeOrmExModule.forCustomRepository([
      DeviceTypeRepository,
      DeviceTypeHistRepository,
    ]),
  ],
  controllers: [DeviceTypeController],
  exports: [DeviceTypeService, DeviceTypeHistService],
  providers: [DeviceTypeService, KeycloakService, DeviceTypeHistService],
})
export class DeviceTypeModule {}
