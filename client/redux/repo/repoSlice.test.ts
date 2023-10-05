import {
  setRepos,
  addContributions,
  setFilteredRepos,
  selectRepos,
  selectFilteredRepos,
  selectRepoByFullName,
} from "./repoSlice";
import { makeStore } from "../store";

const repoRecord = {
  "owner/repo1": {
    id: "1",
    ownerId: "owner",
    full_name: "owner/repo1",
    description: "description1",
    html_url: "https://github.com/owner/repo1",
    language: "JavaScript",
    stargazers_count: 10,
  },
  "owner/repo2": {
    id: "2",
    ownerId: "owner",
    full_name: "owner/repo2",
    description: "description2",
    html_url: "https://github.com/owner/repo2",
    language: "TypeScript",
    stargazers_count: 20,
  },
};
describe("repoSlice", () => {
  const store = makeStore();

  it("should return an empty object if we select repos before setting them", () => {
    const actual = selectRepos(store.getState());
    expect(actual).toEqual({});
  });

  it("should set repos correctly even if we pass it an empty object", () => {
    store.dispatch(setRepos({}));
    const actual = selectRepos(store.getState());
    expect(actual).toEqual({});
  });

  it("should set repos correctly", () => {
    store.dispatch(setRepos(repoRecord));
    const actual = selectRepos(store.getState());
    expect(actual).toEqual(repoRecord);
  });

  it("should add contributions to a repo correctly", () => {
    const contributions: ContributionType[] = [
      { login: "user1", userId: "1" },
      { login: "user2", userId: "2" },
    ];
    const repoName = "owner/repo1";
    store.dispatch(addContributions({ repoName, contributions }));
    const actual = selectRepoByFullName(store.getState(), repoName);
    expect(actual.contributions).toEqual(contributions);
  });

  it("should set filtered repos correctly", () => {
    store.dispatch(setFilteredRepos(repoRecord));
    const actual = selectFilteredRepos(store.getState());
    expect(actual).toEqual(repoRecord);
  });

  it("should return an empty array if the repo is not found", () => {
    const actual = selectRepoByFullName(store.getState(), "notFound");
    expect(actual).toEqual([]);
  });
});
