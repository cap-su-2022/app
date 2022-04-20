import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "../models/users.entity";
import {Roles} from "../models/roles.entity";
import {Rooms} from "../models/rooms.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Environment} from "../constants/config/environment.constant";
import {UsersWarningFlag} from "../models/users-warning-flag.entity";
import {UsersOTP, UsersWarningFlagHistory} from "../models";

const GlobalTypeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>(Environment.db.mysql.url),
    port: configService.get<number>(Environment.db.mysql.port),
    username: configService.get<string>(Environment.db.mysql.username),
    password: configService.get<string>(Environment.db.mysql.password),
    database: configService.get<string>(Environment.db.mysql.database),
    autoLoadEntities: true,
    synchronize: configService.get<boolean>(Environment.db.mysql.synchronize),
    logging: ['query'],
    cache: true,
    extra: {

    },
  }),
  inject: [ConfigService]
});

export default GlobalTypeOrmModule;
