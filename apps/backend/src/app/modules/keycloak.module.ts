import { Module } from "@nestjs/common";
import { KeycloakService } from "../services";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountRepository } from "../repositories";
import ConfigModule from "./global/config.module";
import { AuthenticationService } from "../services";
import { CloudinaryService } from "../services";
import { AccountsModule } from "./accounts.module";
import { AuthenticationController } from "../controllers";

@Module({
  imports: [HttpModule,
    TypeOrmModule.forFeature([
      AccountRepository
    ]),
    ConfigModule,
    AccountsModule
  ],
  controllers: [
    AuthenticationController
  ],
  providers: [
    KeycloakService,
    AuthenticationService,
    CloudinaryService
  ],
  exports: [KeycloakService]
})
export class KeycloakModule {
}
