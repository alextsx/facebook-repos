import { ComponentPropsWithoutRef, memo, useCallback, useMemo } from "react";
import { RepoSmall } from "@/assets/index";
import { useRouter } from "next/navigation";

//styling
import styles from "./RepositoryCard.module.css";
import { RepoHeaderStyled } from "./RepoHeader.styled";
import { RepoIcon } from "./RepoIcon.styled";
import IconGroup from "./IconGroup/IconGroup";

//types
type RepositoryCardProps = {
  repository: Repository;
} & ComponentPropsWithoutRef<"div">;

const RepositoryCard = ({ repository, ...props }: RepositoryCardProps) => {
  const router = useRouter();

  const repoName = useMemo(() => {
    return repository.full_name.split("/")[1] ?? "Unknown";
  }, [repository.full_name]);
  const owner = useMemo(() => {
    return repository.full_name.split("/")[0] ?? "Unknown";
  }, [repository.full_name]);

  const handleClick = useCallback(() => {
    router.push(`/repository/${repository.full_name}`);
  }, [repository, router]);

  return (
    <div onClick={handleClick} className={styles.repositoryCard} {...props}>
      {/* these into separate components */}
      <RepoHeaderStyled>
        <RepoIcon src={RepoSmall} alt="repository icon" />
        <div>
          <h2 className={styles.h2}>{repoName}</h2>
          <h4 className={styles.h4}>{owner}</h4>
        </div>
      </RepoHeaderStyled>
      <p className={styles.description}>{repository.description}</p>
      <IconGroup icon="Keyboard" content={repository.language} />
      <IconGroup icon="Star" content={repository.stargazers_count} />
    </div>
  );
};

export default memo(RepositoryCard);
