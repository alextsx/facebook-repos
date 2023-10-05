import { useEffect } from "react";
import { useGetAllUsersQuery } from "@/redux/user/userApiSlice";
import { useGetReposByQueryQuery } from "@/redux/repo/repoApiSlice";
import { useDispatch } from "react-redux";
import { setUsers } from "@/redux/user/userSlice";
import { setRepos } from "@/redux/repo/repoSlice";
export const usePopulateData = () => {
  const dispatch = useDispatch();

  const {
    data: users,
    isLoading: usersIsLoading,
    isError: usersIsError,
  } = useGetAllUsersQuery(null, {});
  const {
    data: repositories,
    isLoading: repositoriesIsLoading,
    isError: repositoriesIsError,
  } = useGetReposByQueryQuery("", {});

  useEffect(() => {
    console.log(users);
    if (users && Object.keys(users).length) {
      dispatch(setUsers(users));
    }
  }, [users, dispatch]);

  useEffect(() => {
    if (repositories && Object.keys(repositories).length) {
      dispatch(setRepos(repositories));
    }
  }, [repositories, dispatch]);

  return {
    isLoading: usersIsLoading || repositoriesIsLoading,
    isError: usersIsError || repositoriesIsError,
  };
};
