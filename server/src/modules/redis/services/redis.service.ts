import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string) {
    console.log(`GET ${key} from cache`);
    return await this.cache.get(key);
  }

  async set(key: string, value: unknown) {
    console.log(`SET ${key} in cache`);
    return await this.cache.set(key, value);
  }

  async del(key: string) {
    console.log(`DEL ${key} from cache`);
    return await this.cache.del(key);
  }
}
