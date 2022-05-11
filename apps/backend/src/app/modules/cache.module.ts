import {CacheModule} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as redisStore from 'cache-manager-redis-store';
import type {RedisClientOptions} from 'redis';

const GlobalCacheModule = CacheModule.registerAsync<RedisClientOptions>({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    isGlobal: true,
    store: redisStore,
    ttl: 120,

  })
});

export default GlobalCacheModule;
