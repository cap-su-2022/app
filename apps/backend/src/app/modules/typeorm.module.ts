import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Environment} from "../constants/config/environment.constant";

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
      namedPlaceholders: true,
    },
  }),
  inject: [ConfigService]
});

export default GlobalTypeOrmModule;
