"use client";
import { Table } from "@/components/index";
import { useGetRepoContributionQuery } from "@/redux/repo/repoApiSlice";
import { addContributions, selectRepoByFullName } from "@/redux/repo/repoSlice";
import { useEffect, useMemo } from "react";
import { selectUsers } from "@/redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const RepoPage = ({ params: { name } }: { params: { name: string[] } }) => {
  const joinedName = name.join("/");
  const currentRepo = useSelector((state: RootState) =>
    selectRepoByFullName(state, joinedName)
  );
  const dispatch = useDispatch();
  const currentRepoContribution = currentRepo?.contributions;
  const {
    data: contributions,
    isLoading,
    isError,
  } = useGetRepoContributionQuery(joinedName, {
    skip: !!currentRepoContribution || !currentRepo,
  });
  const users = useSelector(selectUsers);
  const mappedContributions: ContributionType[] | null = useMemo(() => {
    if (!contributions || contributions.length === 0) return null;
    return contributions.map((contribution) => {
      return {
        login: users[contribution.userId].login,
        ...contribution,
      };
    });
  }, [contributions, users]);

  useEffect(() => {
    if (mappedContributions && !currentRepoContribution) {
      dispatch(
        addContributions({
          repoName: joinedName,
          contributions: mappedContributions,
        })
      );
    }
  }, [dispatch, joinedName, mappedContributions, currentRepoContribution]);

  return <Table headers={["Login", "User ID"]} content={currentRepo} />;
};

export default RepoPage;
