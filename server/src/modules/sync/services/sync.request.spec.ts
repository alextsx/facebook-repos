import { Test } from '@nestjs/testing';
import { SyncService } from './sync.request';
import { OctokitService } from '../../octokit/octokit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { OctokitResponse } from '@octokit/types';
import { Repository, User } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

const response: OctokitResponse<any> = {
  data: [],
  headers: {},
  status: 200,
  url: '',
};

const owner: User = {
  id: '69631',
  login: 'facebook',
  html_url: 'facebook.com',
  type: 'Organization',
  avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
};
const repos = [
  {
    full_name: 'facebook/react',
    description:
      'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    html_url: 'https://github.com/facebook/react',
    language: 'JavaScript',
    stargazers_count: 172000,
    owner: owner,
  },
  {
    full_name: 'facebook/react2',
    description:
      'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    html_url: 'https://github.com/facebook/react',
    language: 'JavaScript',
    stargazers_count: 172000,
    owner: owner,
  },
];

describe('SyncService', () => {
  let syncService: SyncService;
  let octokitService: OctokitService;
  let prismaService: PrismaService;
  let mockUserUpsert: jest.Mock;
  let mockRepoUpsert: jest.Mock;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SyncService,
        {
          provide: OctokitService,
          useValue: mockDeep<OctokitService>(),
        },
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    syncService = moduleRef.get<SyncService>(SyncService);
    octokitService = moduleRef.get<OctokitService>(OctokitService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);

    //mock the methods
    jest.spyOn(octokitService, 'getReposFromOrg').mockResolvedValue(response);
    jest
      .spyOn(octokitService, 'getContributionsFromContributorsUrl')
      .mockResolvedValue(response);

    mockUserUpsert = jest.fn(() => {
      return owner;
    });
    mockRepoUpsert = jest.fn(() => {
      return owner;
    });
    // mock the upsert method
    // @ts-ignore
    prismaService.$transaction.mockImplementation((cb) => {
      cb({
        repository: {
          upsert: mockRepoUpsert,
          findUnique: jest.fn(() => Promise.resolve(repos[0])),
        },
        user: {
          upsert: mockUserUpsert,
        },
        contribution: {
          create: jest.fn(),
        },
      });
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  //
  describe('getReposByOrg', () => {
    it('should call octokit.getReposFromOrg with the correct org name', async () => {
      const orgName = 'facebook';

      await syncService.getReposByOrg(orgName);

      expect(octokitService.getReposFromOrg).toHaveBeenCalledWith(orgName);
    });

    it('should return the response data', async () => {
      const orgName = 'facebook';
      jest.spyOn(octokitService, 'getReposFromOrg').mockResolvedValue(response);

      const result = await syncService.getReposByOrg(orgName);

      expect(result).toEqual(response.data);
    });
  });

  //
  describe('getContributionsFromContributorsUrl', () => {
    it('should call octokit.getContributionsFromContributorsUrl with the correct url', async () => {
      const url = 'https://api.github.com/repos/facebook/react/contributors';
      jest.spyOn(octokitService, 'getContributionsFromContributorsUrl');

      await syncService.getContributionsFromContributorsUrl(url);

      expect(
        octokitService.getContributionsFromContributorsUrl,
      ).toHaveBeenCalledWith(url);
    });

    it('should return the response data', async () => {
      const url = 'https://api.github.com/repos/facebook/react/contributors';

      const result = await syncService.getContributionsFromContributorsUrl(url);

      expect(result).toEqual(response.data);
    });
  });

  //
  describe('upsertReposAndOwners', () => {
    it('should call user upsert', async () => {
      jest.spyOn(syncService, 'upsertReposAndOwners');
      await syncService.upsertReposAndOwners(repos);
      expect(mockUserUpsert).toHaveBeenCalled();
    });

    it('should call repo upsert', async () => {
      jest.spyOn(syncService, 'upsertReposAndOwners');
      await syncService.upsertReposAndOwners(repos);
      expect(mockRepoUpsert).toHaveBeenCalled();
    });
  });

  //
  describe('upsertContributionsAndUsers', () => {
    it('should call db.$transaction', async () => {
      jest
        .spyOn(syncService, 'getContributionsFromContributorsUrl')
        .mockResolvedValue([1, 2, 3, 4]);
      jest.spyOn(syncService, 'upsertContributionsAndUsers');
      await syncService.upsertContributionsAndUsers(repos);
      //@ts-ignore
      console.log(prismaService.$transaction.mock.calls);

      expect(prismaService.$transaction).toHaveBeenCalled();
    });
  });

  //

  describe('sync', () => {
    it('should call getReposByOrg with the correct argument', async () => {
      const repos = [{ full_name: 'facebook/react' }];
      jest.spyOn(syncService, 'getReposByOrg').mockResolvedValue(repos);
      jest
        .spyOn(syncService, 'upsertReposAndOwners')
        .mockResolvedValue(undefined);
      jest
        .spyOn(syncService, 'upsertContributionsAndUsers')
        .mockResolvedValue(undefined);

      await syncService.sync();
      expect(syncService.getReposByOrg).toHaveBeenCalledWith('facebook');
    });

    it('should call upsertReposAndOwners with the correct argument', async () => {
      const repos = [{ full_name: 'facebook/react' }];
      jest.spyOn(syncService, 'getReposByOrg').mockResolvedValue(repos);
      jest
        .spyOn(syncService, 'upsertReposAndOwners')
        .mockResolvedValue(undefined);
      jest
        .spyOn(syncService, 'upsertContributionsAndUsers')
        .mockResolvedValue(undefined);

      await syncService.sync();
      expect(syncService.upsertReposAndOwners).toHaveBeenCalledWith(repos);
    });

    it('should call upsertContributionsAndUsers with the correct argument', async () => {
      const repos = [{ full_name: 'facebook/react' }];
      jest.spyOn(syncService, 'getReposByOrg').mockResolvedValue(repos);
      jest
        .spyOn(syncService, 'upsertReposAndOwners')
        .mockResolvedValue(undefined);
      jest
        .spyOn(syncService, 'upsertContributionsAndUsers')
        .mockResolvedValue(undefined);

      await syncService.sync();
      expect(syncService.upsertContributionsAndUsers).toHaveBeenCalledWith(
        repos,
      );
    });
  });
});
