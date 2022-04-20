import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersWarningFlag} from "../models/users-warning-flag.entity";
import {UsersWarningFlagHistory} from "../models";
import {UsersWarningFlagController} from "../controllers/users-warning-flag.controller";
import {UsersWarningFlagHistoryController} from "../controllers/users-warning-flag-history.controller";
import {UsersWarningFlagService} from "../services/users-warning-flag.service";
import {UsersWarningFlagHistoryService} from "../services/users-warning-flag-hist.service";
import {UsersWarningFlagRepository} from "../repositories/users-warning-flag";
import {UsersWarningFlagHistoryRepository} from "../repositories/users-warning-flag-history";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersWarningFlag,
      UsersWarningFlagHistory
    ]),
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
