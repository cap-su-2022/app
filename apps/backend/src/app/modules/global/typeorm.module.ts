import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Environment} from "@app/constants";

const GlobalTypeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>(Environment.db.postgres.url),
    port: configService.get<number>(Environment.db.postgres.port),
    username: configService.get<string>(Environment.db.postgres.username),
    password: configService.get<string>(Environment.db.postgres.password),
    database: configService.get<string>(Environment.db.postgres.database),
    autoLoadEntities: true,
    synchronize: configService.get<boolean>(Environment.db.postgres.synchronize),
    logging: ['query'],
    cache: false,
  }),
  inject: [ConfigService]
});

export default GlobalTypeOrmModule;
