import { useGetReposByQueryQuery } from "@/redux/repo/repoApiSlice";
import { setFilteredRepos } from "@/redux/repo/repoSlice";
import { selectSearchQuery, setSearchQuery } from "@/redux/search/searchSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useSearch = () => {
  const dispatch = useDispatch();
  const [localSearchQuery, _setLocalSearchQuery] = useState("");
  const globalSearchQuery = useSelector(selectSearchQuery);

  const {
    data: filteredRepos,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useGetReposByQueryQuery(globalSearchQuery, {
    skip: !globalSearchQuery,
  });

  const setLocalSearchQuery = (query: string) => {
    _setLocalSearchQuery(query);
  };

  const setGlobalSearchQuery = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  useEffect(() => {
    dispatch(setFilteredRepos(filteredRepos));
  }, [filteredRepos, dispatch]);

  return {
    localSearchQuery,
    setLocalSearchQuery,
    isSearchLoading,
    setGlobalSearchQuery,
  };
};

export default useSearch;
