import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Environment } from "@app/constants";
import {
  Accounts,
  BookingRequest,
  Devices,
  DevicesHist,
  Rooms,
  RoomWishlist,
  UsersOTP,
  UsersWarningFlag,
  UsersWarningFlagHistory
} from "../../models";

const GlobalTypeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: "postgres",
    host: configService.get<string>(Environment.db.postgres.url),
    port: configService.get<number>(Environment.db.postgres.port),
    username: configService.get<string>(Environment.db.postgres.username),
    password: configService.get<string>(Environment.db.postgres.password),
    database: configService.get<string>(Environment.db.postgres.database),
    entities: [
      Accounts,
      Rooms,
      BookingRequest,
      Devices,
      DevicesHist,
      RoomWishlist,
      Rooms,
      UsersOTP,
      UsersWarningFlag,
      UsersWarningFlagHistory
    ],
    synchronize: configService.get<boolean>(Environment.db.postgres.synchronize),
    logging: ["query"],
    cache: false,
    timezone: "+7"
  }),
  inject: [ConfigService]
});

export default GlobalTypeOrmModule;
