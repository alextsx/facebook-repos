import { Controller, Get } from '@nestjs/common';
import { SyncService } from '../services/sync.request';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get()
  async sync() {
    // this will be an event
    return await this.syncService.sync();
  }
}
