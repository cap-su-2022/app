import { Module } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { TypeOrmExModule } from './global/typeorm-ex.module';
import { RoleController } from '../controllers/role.controller';
import { RolesRepository } from '../repositories/roles.repository';
import { KeycloakService } from '../services';
import ConfigModule from './global/config.module';
import { HttpModule } from '@nestjs/axios';
import { AccountsModule } from './accounts.module';
import { RoleHistRepository } from '../repositories/role-hist.repository';
import { RoleHistService } from '../services/role-hist.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AccountsModule,
    TypeOrmExModule.forCustomRepository([RolesRepository, RoleHistRepository]),
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleHistService, KeycloakService],
  exports: [RoleService, RoleHistService],
})
export class RolesModule {}
