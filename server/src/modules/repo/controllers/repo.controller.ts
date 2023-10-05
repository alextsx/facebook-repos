import { Controller, Get, Param, Query } from '@nestjs/common';
import { RepoService } from '../services/repo.request';

//caching
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UseInterceptors } from '@nestjs/common';

@Controller('repository')
@UseInterceptors(CacheInterceptor)
export class RepoController {
  constructor(private readonly repoService: RepoService) {}

  @Get()
  async filterRepositories(
    @Query('q') params: string | string[] | null | undefined,
  ) {
    return await this.repoService.findRepoByQueryParams(params);
  }

  @Get('/:org/:repo/contributions')
  async getContributions(
    @Param('org') org: string,
    @Param('repo') repo: string,
  ) {
    return await this.repoService.getContributions(`${org}/${repo}`);
  }
}
