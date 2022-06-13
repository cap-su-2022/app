import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersWarningFlagController } from "../controllers";
import { UsersWarningFlagHistoryController } from "../controllers/users-warning-flag-history.controller";
import { UsersWarningFlagService } from "../services";
import { UsersWarningFlagHistoryService } from "../services";
import { UsersWarningFlagRepository } from "../repositories";
import { UsersWarningFlagHistoryRepository } from "../repositories";
import { KeycloakModule } from "./keycloak.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersWarningFlagRepository,
      UsersWarningFlagHistoryRepository
    ]),
    KeycloakModule
  ],
  controllers: [
    UsersWarningFlagController,
    UsersWarningFlagHistoryController,
  ],
  providers: [
    UsersWarningFlagService,
    UsersWarningFlagHistoryService,
    UsersWarningFlagRepository,
    UsersWarningFlagHistoryRepository
  ]
})
export class UsersWarningFlagModule {}
