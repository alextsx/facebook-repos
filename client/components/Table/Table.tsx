"use client";
import Image from "next/image";
import { memo, useMemo } from "react";
import { TableCell } from "@/components/index";
import { HeaderStyled, TableContainerStyled } from "./Table.styled";

type TableProps = {
  headers: string[];
  content?: UserState | RepositoryWithContributions;
  repositoryId?: string;
};

const Table = ({ headers, content }: TableProps) => {
  const mapContentToProps = useMemo(() => {
    if (!content) {
      return null;
    }

    if (typeof content === "object" && "html_url" in content) {
      const { contributions } = content as RepositoryWithContributions;
      return contributions?.map(
        (contribution: ContributionType, indx: number) => {
          const { userId, login } = contribution;
          return (
            <tr key={indx}>
              <TableCell>{login}</TableCell>
              <TableCell>{userId}</TableCell>
            </tr>
          );
        }
      );
    }
    const users = content as UserState;
    return Object.keys(users)?.map((id: keyof UserState, indx: number) => {
      if (!(id in content)) {
        return null;
      }

      const { avatar_url, login, type } = users[id] as User;

      return (
        <tr key={indx}>
          <TableCell>
            <Image
              src={avatar_url}
              alt="avatar"
              width={60}
              height={60}
              style={{ borderRadius: "40px" }}
            />
          </TableCell>
          <TableCell>{login}</TableCell>
          <TableCell>{type}</TableCell>
        </tr>
      );
    });
  }, [content]);

  return (
    <TableContainerStyled>
      <thead>
        <tr>
          {headers.map((header, indx) => {
            return (
              <HeaderStyled percentage={(1 / headers.length) * 100} key={indx}>
                {header}
              </HeaderStyled>
            );
          })}
        </tr>
      </thead>
      <tbody>{mapContentToProps}</tbody>
    </TableContainerStyled>
  );
};

export default memo(Table);
