import {Module} from "@nestjs/common";
import {UsersController} from "../controllers/users.controller";
import {UsersService} from "../services/users.service";
import {UsersRepository} from "../repositories/users.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "../models";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository]
})
export class UsersModule {}
