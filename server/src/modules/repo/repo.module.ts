import { Module } from '@nestjs/common';
import { RepoController } from './controllers/repo.controller';
import { RepoService } from './services/repo.request';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [RepoController],
  providers: [RepoService],
})
export class RepoModule {}
