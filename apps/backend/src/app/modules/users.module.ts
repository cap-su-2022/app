import {Module} from "@nestjs/common";
import {UsersController} from "../controllers/users.controller";
import {UsersService} from "../services/users.service";
import {UsersRepository} from "../repositories/users.repository";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
