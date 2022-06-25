import {Module} from "@nestjs/common";
import {RoleService} from "../services/role.service";
import {TypeOrmExModule} from "./global/typeorm-ex.module";
import {Roles} from "../models/role.entity";
import {RoleController} from "../controllers/role.controller";
import {RolesRepository} from "../repositories/roles.repository";
import {KeycloakService} from "../services";
import ConfigModule from "./global/config.module";
import {HttpModule} from "@nestjs/axios";
import { AccountRepository } from "../repositories";
import {AccountsModule} from "./accounts.module";

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AccountsModule,
    TypeOrmExModule.forCustomRepository([RolesRepository])
  ],
  providers: [RoleService, KeycloakService],
  controllers: [RoleController],
  exports: [RoleService]
})
export class RolesModule {}
