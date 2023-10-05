"use client";
import { usePathname } from "next/navigation";
import {
  User,
  RepoSmall,
  UserActive,
  RepoSmallActive,
  DownArrow,
} from "@/assets/index";
import Image from "next/image";
import { PropsWithChildren } from "react";

//icons
const icons = { User, RepoSmall, UserActive, RepoSmallActive };

//styles

import styles from "./SidebarLink.module.css";
import Link from "next/link";

type SidebarLinkProps = {
  link: string;
  label: string;
  icon: "User" | "RepoSmall";
};

const SidebarLink = ({
  link,
  label,
  icon,
  children,
}: PropsWithChildren<SidebarLinkProps>) => {
  const pathName = usePathname();

  const isActive = pathName === link;
  const displayChildren = children && pathName.includes("/repository/");
  const iconSvg = icons[`${icon}${isActive ? "Active" : ""}`];

  return (
    <div className={styles.container}>
      <Link className={styles.link} href={link}>
        {/* sidebarlink icon */}
        <Image src={iconSvg} alt={`${label} icon`} />

        {/* sidebarlink label */}
        <span className={isActive ? styles.active : ""}>{label}</span>

        {/* sidebarlink downarrow */}
        {displayChildren && <Image src={DownArrow} alt="downarrow icon" />}
      </Link>
      {/* sidebarlink child */}
      {displayChildren && children}
    </div>
  );
};

export default SidebarLink;
