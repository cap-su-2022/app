import { Module } from "@nestjs/common";
import { AccountsController } from "../controllers";
import { AccountsService } from "../services";
import { AccountRepository } from "../repositories";
import { KeycloakService } from "../services";
import ConfigModule from "./global/config.module";
import { HttpModule } from "@nestjs/axios";
import { CloudinaryService } from "../services";
import { TypeOrmExModule } from "./global/typeorm-ex.module";

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmExModule.forCustomRepository([AccountRepository])
  ],
  controllers: [
    AccountsController
  ],
  providers: [AccountsService, KeycloakService, CloudinaryService],
  exports: [AccountsService]

})
export class AccountsModule {}
