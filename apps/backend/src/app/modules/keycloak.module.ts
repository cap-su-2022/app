import { Module } from "@nestjs/common";
import { KeycloakService } from "../services/keycloak.service";
import { KeycloakController } from "../controllers/keycloak.controller";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountRepository } from "../repositories/account.repository.";
import ConfigModule from "./global/config.module";
import { AuthenticationService } from "../services/authentication.service";
import { CloudinaryService } from "../services/cloudinary.service";
import { AccountsModule } from "./accounts.module";

@Module({
  imports: [HttpModule,
    TypeOrmModule.forFeature([
      AccountRepository
    ]),
    ConfigModule,
    AccountsModule
  ],
  controllers: [KeycloakController],
  providers: [
    KeycloakService,
    AuthenticationService,
    CloudinaryService
  ],
  exports: [KeycloakService]
})
export class KeycloakModule {
}
