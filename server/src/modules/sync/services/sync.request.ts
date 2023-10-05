import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OctokitService } from '../../octokit/octokit.service';

@Injectable()
export class SyncService {
  constructor(
    private readonly db: PrismaService,
    private readonly octokit: OctokitService,
  ) {}

  getReposByOrg = async (orgName: string) => {
    const response = await this.octokit.getReposFromOrg(orgName);
    return response?.data;
  };

  getContributionsFromContributorsUrl = async (
    contributors_url: string,
  ): Promise<any> => {
    const response = await this.octokit.getContributionsFromContributorsUrl(
      contributors_url,
    );
    return response?.data;
  };

  upsertReposAndOwners = async (repos: any) => {
    const promises = repos.map(
      async ({
        owner,
        full_name,
        description,
        html_url,
        language,
        stargazers_count,
      }) =>
        this.db.$transaction(async (tx) => {
          const upsertedUser = await tx.user.upsert({
            where: { login: owner.login },
            create: {
              login: owner.login,
              html_url: owner.html_url,
              type: owner.type,
              avatar_url: owner.avatar_url,
            },
            update: {
              avatar_url: owner.avatar_url,
            },
          });

          await tx.repository.upsert({
            where: { full_name },
            update: {
              stargazers_count,
              language,
              description,
            },
            create: {
              owner: {
                connect: {
                  id: upsertedUser.id,
                },
              },
              full_name,
              description,
              html_url,
              language,
              stargazers_count,
            },
          });
        }),
    );

    return Promise.all(promises);
  };
  upsertContributionsAndUsers = async (repos) => {
    repos.map(async (repo) => {
      const contributions = await this.getContributionsFromContributorsUrl(
        repo.contributors_url,
      );

      const promises = contributions.map(async (contribution) =>
        this.db.$transaction(async (tx) => {
          const upsertedUser = await tx.user.upsert({
            where: { login: contribution.login },
            create: {
              login: contribution.login,
              html_url: contribution.html_url,
              type: contribution.type,
              avatar_url: contribution.avatar_url,
            },
            update: {
              avatar_url: contribution.avatar_url,
            },
          });

          const repoInDb = await tx.repository.findUnique({
            where: {
              full_name: repo.full_name,
            },
          });

          await tx.contribution.create({
            data: {
              userId: upsertedUser.id,
              repositoryId: repoInDb.id,
            },
          });
        }),
      );

      return Promise.all(promises);
    });
  };

  sync = async () => {
    const repos = await this.getReposByOrg('facebook');
    await this.upsertReposAndOwners(repos);
    await this.upsertContributionsAndUsers(repos);
  };
}
