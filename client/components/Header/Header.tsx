"use client";
import { ComponentPropsWithoutRef, KeyboardEvent, MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePopulateData } from "@/hooks/usePopulateData";
import returnPageName from "@/lib/pageName";
import { Search, EmptySearch } from "@/assets/index";
import useSearch from "@/hooks/useSearch";
import * as S from "./Header.styled";
import styles from "./Header.module.css";

type HeaderProps = /*  {} & */ ComponentPropsWithoutRef<"div">;
type MouseOrKeyboardEvent =
  | MouseEvent<HTMLImageElement>
  | KeyboardEvent<HTMLInputElement>;
const Header = ({ ...props }: HeaderProps) => {
  const { isError, isLoading } = usePopulateData();
  const pathName = usePathname();
  const router = useRouter();
  const {
    setGlobalSearchQuery,
    setLocalSearchQuery,
    localSearchQuery,
    isSearchLoading,
  } = useSearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleSubmit = (e: MouseOrKeyboardEvent) => {
    if ("key" in e && e.key !== "Enter") {
      return;
    }
    setGlobalSearchQuery(localSearchQuery);
    router.push("/repositories");
  };

  return (
    <div {...props}>
      <h1 className={styles.h1}>{returnPageName(pathName)}</h1>
      <div
        style={{
          position: "relative",
        }}
      >
        <S.Input
          type="text"
          value={localSearchQuery}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
        />
        <S.Image
          src={localSearchQuery ? EmptySearch : Search}
          onClick={(props) => {
            if (!localSearchQuery) {
              handleSubmit(props);
              return;
            }
            setLocalSearchQuery("");
            setGlobalSearchQuery("");
          }}
          alt="search"
        />
      </div>
    </div>
  );
};

export default Header;
