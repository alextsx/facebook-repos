"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  repos: {},
  filteredRepos: {},
} as RepoState;

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setRepos: (state, action: PayloadAction<RepoRecord>) => {
      state.repos = { ...action.payload };
      return state;
    },
    addContributions: (
      state,
      action: PayloadAction<{
        repoName: string;
        contributions: ContributionType[];
      }>
    ) => {
      const repo = state.repos[action.payload.repoName];
      if (repo) {
        repo.contributions = action.payload.contributions;
      }
      return state;
    },
    setFilteredRepos: (
      state,
      action: PayloadAction<RepoRecord | undefined>
    ) => {
      state.filteredRepos = action.payload ? { ...action.payload } : {};
      return state;
    },
  },
});

//actions
export const { setRepos, addContributions, setFilteredRepos } =
  repoSlice.actions;

//selectors
export const selectRepos = (state: RootState) => state.repo.repos;
export const selectFilteredRepos = (state: RootState) =>
  state.repo.filteredRepos;
export const selectRepoByFullName = (
  state: RootState,
  fullName: string
): RepositoryWithContributions => {
  return state.repo.repos[fullName] ?? [];
};
export default repoSlice.reducer;
