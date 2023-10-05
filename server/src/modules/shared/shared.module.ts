import { Module } from '@nestjs/common';
import { PrismaModule } from '../../modules/prisma/prisma.module';
import { OctokitModule } from '../octokit/octokit.module';

@Module({
  imports: [PrismaModule, OctokitModule],
  exports: [PrismaModule, OctokitModule],
})
export class SharedModule {}
