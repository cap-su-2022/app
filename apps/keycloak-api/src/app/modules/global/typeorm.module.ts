import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Environment} from "@app/constants";

const GlobalTypeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>(Environment.db.keycloak.url),
    port: configService.get<number>(Environment.db.keycloak.port),
    username: configService.get<string>(Environment.db.keycloak.username),
    password: configService.get<string>(Environment.db.keycloak.password),
    database: configService.get<string>(Environment.db.keycloak.database),
    autoLoadEntities: true,
    synchronize: configService.get<boolean>(Environment.db.keycloak.synchronize),
    logging: ['query'],
    cache: true,
    extra: {
      namedPlaceholders: true,
    },
  }),
  inject: [ConfigService]
});

export default GlobalTypeOrmModule;
