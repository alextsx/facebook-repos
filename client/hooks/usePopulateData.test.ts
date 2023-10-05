import { act, renderHook } from "@testing-library/react-hooks";
import { useDispatch } from "react-redux";
import { useGetAllUsersQuery } from "@/redux/user/userApiSlice";
import { useGetReposByQueryQuery } from "@/redux/repo/repoApiSlice";
import { setUsers } from "@/redux/user/userSlice";
import { setRepos } from "@/redux/repo/repoSlice";
import { usePopulateData } from "./usePopulateData";
import { waitFor } from "@testing-library/dom";
import { cleanup } from "@testing-library/react";

const userStateMock: UserState = {
  "051a5147-8291-4766-a352-d1c27f49fe1c": {
    id: "051a5147-8291-4766-a352-d1c27f49fe1c",
    login: "stuclar",
    avatar_url: "https://avatars.githubusercontent.com/u/7219951?v=4",
    html_url: "https://github.com/stuclar",
    type: "User",
  },
};

const repoRecordsMock: RepoRecord = {
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

const useGetAllUsersQueryResponseMock = {
  data: userStateMock,
  isLoading: false,
  isError: false,
};

const useGetReposByQueryQueryResponseMock = {
  data: repoRecordsMock,
  isLoading: false,
  isError: false,
};

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("@/redux/user/userApiSlice", () => ({
  useGetAllUsersQuery: jest.fn(),
}));

jest.mock("@/redux/repo/repoApiSlice", () => ({
  useGetReposByQueryQuery: jest.fn(),
}));

describe("usePopulateData", () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (useGetAllUsersQuery as jest.Mock).mockReturnValue(
      useGetAllUsersQueryResponseMock
    );

    (useGetReposByQueryQuery as jest.Mock).mockReturnValue(
      useGetReposByQueryQueryResponseMock
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should dispatch setUsers action when users data is available", async () => {
    act(async () => {
      renderHook(() => usePopulateData());
    });

    await waitFor(() => {
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    const setUsersAction = dispatch.mock.calls[0][0];
    expect(setUsersAction).toEqual(setUsers(userStateMock));
  });

  it("should dispatch setRepos action when repositories data is available", async () => {
    act(() => {
      renderHook(() => usePopulateData());
    });

    await waitFor(() => {
      expect(dispatch.mock.calls[1][0]).toBeDefined();
    });
    const setReposAction = dispatch.mock.calls[1][0];
    expect(setReposAction).toEqual(setRepos(repoRecordsMock));
  });

  it("should return isLoading true when either users or repositories are loading", () => {
    (useGetAllUsersQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    (useGetReposByQueryQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => usePopulateData());

    expect(result.current.isLoading).toBe(true);
  });

  it("should return isError true when either users or repositories have an error", () => {
    (useGetAllUsersQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    (useGetReposByQueryQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => usePopulateData());

    expect(result.current.isError).toBe(true);
  });

  it("should return isLoading false and isError false when both users and repositories are loaded", () => {
    const { result } = renderHook(() => usePopulateData());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });
});
