import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisService } from './redis.service';

describe('RedisService', () => {
  let service: RedisService;
  let cacheMock: jest.Mocked<any>;

  beforeEach(async () => {
    cacheMock = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: CACHE_MANAGER,
          useValue: cacheMock,
        },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call cache.get() method', async () => {
    const key = 'test-key';
    await service.get(key);
    expect(cacheMock.get).toHaveBeenCalledWith(key);
  });

  it('should call cache.set() method', async () => {
    const key = 'test-key';
    const value = 'test-value';
    await service.set(key, value);
    expect(cacheMock.set).toHaveBeenCalledWith(key, value);
  });

  it('should call cache.del() method', async () => {
    const key = 'test-key';
    await service.del(key);
    expect(cacheMock.del).toHaveBeenCalledWith(key);
  });
});
