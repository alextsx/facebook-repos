import { Module } from '@nestjs/common';
import { RedisController } from './controllers/redis.controller';
import { RedisService } from './services/redis.service';
//caching
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          url: 'redis://localhost:6379',
          ttl: 1000 * 60 * 60 * 24, //1 day
        }),
      }),
      isGlobal: true,
    }),
  ],
  controllers: [RedisController],
  providers: [RedisService],
})
export class RedisModule {}
