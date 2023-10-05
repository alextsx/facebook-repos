import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { mapParamToSelectQueryParams } from '../../../lib/mapParamToSelectQueryParams';

@Injectable()
export class RepoService {
  constructor(private readonly db: PrismaService) {}
  async findRepoByQueryParams(params: string | string[] | null | undefined) {
    if (!params) {
      return await this.db.repository.findMany();
    }
    if (typeof params === 'string') {
      params = [params];
    }
    const promises = params.map((param) =>
      this.db.repository.findMany({
        where: mapParamToSelectQueryParams(param),
      }),
    );

    return await Promise.all(promises);
  }

  async findRepoByName(name: string) {
    return await this.db.repository.findUnique({
      where: {
        full_name: name,
      },
    });
  }

  async getContributions(name: string) {
    const repo = await this.findRepoByName(name);
    if (!repo) return [];
    return this.db.contribution.findMany({
      where: {
        repositoryId: repo.id,
      },
      include: {
        user: true,
      },
    });
  }
}
