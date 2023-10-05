import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

//Modules
import { SyncModule } from './modules/sync/sync.module';
import { UserModule } from './modules/user/user.module';
import { RepoModule } from './modules/repo/repo.module';
import { RedisModule } from './modules/redis/redis.module'; //cache

//logger middleware
import LoggerMiddleware from './middleware/logger.middleware';

@Module({
  imports: [SyncModule, UserModule, RepoModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
