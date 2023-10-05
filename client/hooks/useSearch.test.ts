import { renderHook, act } from "@testing-library/react-hooks";
import { useGetReposByQueryQuery } from "@/redux/repo/repoApiSlice";
import { setFilteredRepos } from "@/redux/repo/repoSlice";
import { selectSearchQuery, setSearchQuery } from "@/redux/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import useSearch from "./useSearch";
import { waitFor } from "@testing-library/dom";

jest.mock("@/redux/repo/repoApiSlice");
jest.mock("@/redux/repo/repoSlice");
jest.mock("@/redux/search/searchSlice");

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("@/redux/repo/repoApiSlice", () => ({
  useGetReposByQueryQuery: jest.fn(),
}));

describe("useSearch", () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        search: {
          searchQuery: "",
        },
      })
    );
    (useGetReposByQueryQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set local search query", () => {
    const { result } = renderHook(() => useSearch());
    const query = "test query";

    act(() => {
      result.current.setLocalSearchQuery(query);
    });

    expect(result.current.localSearchQuery).toEqual(query);
  });

  it("should set global search query", async () => {
    const { result } = renderHook(() => useSearch());
    const query = "test query";

    act(() => {
      result.current.setGlobalSearchQuery(query);
    });

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalled();
    });
    expect(dispatch).toHaveBeenCalledWith(setSearchQuery(query));
  });
});
