import {CacheModule} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as redisStore from 'cache-manager-redis-store';
import type {RedisClientOptions} from 'redis';

const GlobalCacheModule = CacheModule.register<RedisClientOptions>({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    isGlobal: true,
    store: redisStore,
    ttl: 120,

    socket: {
      host: 'fu-lib-room.tk',
      port: 6379,
      password: '12345678x@X',
    }

  })
});

export default GlobalCacheModule;
