import {Module} from "@nestjs/common";
import {RolesController} from "../controllers/roles.controller";
import {RolesService} from "../services/role.service";
import {RolesRepository} from "../repositories/roles.repository";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([RolesRepository]),
  ],
  controllers: [
    RolesController
  ],
  providers: [
    RolesService,
    RolesRepository,
  ]
})
export class RolesModule {}
