import { Test, TestingModule } from '@nestjs/testing';
import { RepoService } from './repo.request';
import { PrismaService } from '../../prisma/prisma.service';
import { mockDeep } from 'jest-mock-extended';

const mockRepos = [
  {
    id: '1',
    full_name: 'facebook/react',
    description:
      'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    html_url: 'https://github.com/facebook/react',
    language: 'JavaScript',
    stargazers_count: 172000,
  },
  {
    id: '2',
    full_name: 'facebook/react2',
    description:
      'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    html_url: 'https://github.com/facebook/react',
    language: 'JavaScript',
    stargazers_count: 172000,
  },
];

describe('RepoService', () => {
  let service: RepoService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepoService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    service = module.get<RepoService>(RepoService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findRepoByQueryParams', () => {
    it('should return all repositories if no params are provided', async () => {
      jest.spyOn(prismaService.repository, 'findMany').mockResolvedValue([]);

      const result = await service.findRepoByQueryParams(null);

      expect(prismaService.repository.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should call findMany with the correct params', async () => {
      const params = 'language:javascript';
      const expectedQueryParams = {
        where: { language: { contains: 'javascript' } },
      };
      jest
        .spyOn(prismaService.repository, 'findMany')
        .mockResolvedValueOnce([]);
      await service.findRepoByQueryParams(params);

      expect(prismaService.repository.findMany).toHaveBeenCalledWith(
        expectedQueryParams,
      );
    });

    it('should return an array of repositories if params is an array of strings', async () => {
      const params = 'language:javascript';
      jest
        .spyOn(prismaService.repository, 'findMany')
        .mockResolvedValueOnce([...(mockRepos as any)]);

      const result = await service.findRepoByQueryParams(params);
      expect(result).toEqual([[...mockRepos]]);
    });
  });

  describe('findRepoByName', () => {
    it('should call findUnique with the correct params', async () => {
      const repoName = 'test-repo';
      const expectedQueryParams = {
        full_name: repoName,
      };
      jest
        .spyOn(prismaService.repository, 'findUnique')
        .mockResolvedValueOnce(mockRepos[0] as any);

      await service.findRepoByName(repoName);

      expect(prismaService.repository.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expectedQueryParams,
        }),
      );
    });
    it('should return mockRepos[0]', async () => {
      const repoName = 'test-repo';

      jest
        .spyOn(prismaService.repository, 'findUnique')
        .mockResolvedValueOnce(mockRepos[0] as any);

      const result = await service.findRepoByName(repoName);

      expect(result).toBe(mockRepos[0]);
    });
  });

  describe('getContributions', () => {
    it('should call findRepoByName with the correct params', async () => {
      const repoName = 'test-repo';
      const expectedQueryParams = {
        full_name: repoName,
      };
      jest
        .spyOn(prismaService.repository, 'findUnique')
        .mockResolvedValueOnce(mockRepos[0] as any);
      await service.getContributions(repoName);
      expect(prismaService.repository.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expectedQueryParams,
        }),
      );
    });

    it('should call contribution.findMany with the correct params', async () => {
      const repoName = 'test-repo';
      const expectedQueryParams = {
        repositoryId: mockRepos[0].id,
      };
      jest
        .spyOn(prismaService.repository, 'findUnique')
        .mockResolvedValueOnce(mockRepos[0] as any);
      jest
        .spyOn(prismaService.contribution, 'findMany')
        .mockResolvedValueOnce([]);
      await service.getContributions(repoName);
      expect(prismaService.contribution.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expectedQueryParams,
        }),
      );
    });

    it("should return an array of contributions if the repo's contributions exist", async () => {
      const repoName = 'test-repo';

      jest
        .spyOn(prismaService.repository, 'findUnique')
        .mockResolvedValueOnce(mockRepos[0] as any);
      jest
        .spyOn(prismaService.contribution, 'findMany')
        .mockResolvedValueOnce([]);
      const result = await service.getContributions(repoName);
      expect(result).toEqual([]);
    });
  });
});
