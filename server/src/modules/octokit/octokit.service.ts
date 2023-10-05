import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
require('dotenv').config();

const REQUEST_OPTIONS = {
  org: 'ORG',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
  },
};

@Injectable()
export class OctokitService {
  private readonly octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_API_KEY,
    });
  }

  getReposFromOrg = (org: string) => {
    return this.octokit.request(`GET /orgs/${org}/repos`, REQUEST_OPTIONS);
  };

  getContributionsFromContributorsUrl = (contributors_url: string) => {
    return this.octokit.request(contributors_url, REQUEST_OPTIONS);
  };
}
