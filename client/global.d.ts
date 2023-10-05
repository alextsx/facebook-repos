//responses
type Repository = {
  id: string;
  ownerId: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
};

type User = {
  id: string;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
};

type ContributionResponse = {
  userId: string;
  repositoryId: string;
}[];

//custom contribution type for singular repo page
type ContributionType = Pick<User, "login"> & {
  userId: keyof UserState;
};

//custom repo type with contributions added
type RepositoryWithContributions = Repository & {
  contributions?: ContributionType[];
};
//states
type RepoRecord = Record<string, RepositoryWithContributions>;

type RepoState = {
  repos: RepoRecord;
  filteredRepos: RepoRecord;
};
type UserState = Record<string, User>;
