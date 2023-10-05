import { mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from './user.request';
import { Test } from '@nestjs/testing';

const mockUsers = [
  {
    id: '1',
    login: 'test',
    avatar_url: 'test',
    html_url: 'test',
    type: 'test',
  },
  {
    id: '2',
    login: 'test2',
    avatar_url: 'test2',
    html_url: 'test2',
    type: 'test2',
  },
];

describe('User service', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });
  it('should return all users from db', async () => {
    jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(mockUsers);
    expect(await userService.getAllUsers()).toBe(mockUsers);
  });
});
