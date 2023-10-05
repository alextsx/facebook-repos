import { Test } from '@nestjs/testing';
import { SyncController } from './sync.controller';
import { SyncService } from '../services/sync.request';
describe('SyncController', () => {
  let syncController: SyncController;
  let syncMethod;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [SyncController],
      providers: [
        {
          provide: SyncService,
          useValue: {
            sync: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();
    syncController = module.get<SyncController>(SyncController);
    //mock syncService
    syncMethod = await syncController.sync();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a promise<void>', async () => {
    expect(syncMethod).toBeUndefined();
  });
});
