"use client";
import { RepositoryCard } from "@/components/index";
import { selectFilteredRepos, selectRepos } from "@/redux/repo/repoSlice";
import { selectSearchQuery } from "@/redux/search/searchSlice";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./page.module.css";

const Repositories = () => {
  const repositories = useSelector(selectRepos);
  const filteredRepos = useSelector(selectFilteredRepos);
  const globalSearchQuery = useSelector(selectSearchQuery);
  const mapRepoDataToRepoCard = useMemo(() => {
    const repositoriesToDisplay = globalSearchQuery
      ? filteredRepos
      : repositories;
    return Object.keys(repositoriesToDisplay)?.map(
      (repositoryId: string, indx: number) => {
        //if repo has values with the inputValue in it we return the repo card
        //but repo is an object so we have to iterate over it
        return (
          <RepositoryCard repository={repositories[repositoryId]} key={indx} />
        );
      }
    );
  }, [repositories, filteredRepos, globalSearchQuery]);

  return <div className={styles.repoContainer}>{mapRepoDataToRepoCard}</div>;
};

export default Repositories;
