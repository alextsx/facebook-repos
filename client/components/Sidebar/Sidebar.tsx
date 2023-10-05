import { ComponentPropsWithRef } from "react";
import { SidebarLink, Logo, SidebarLinkChild } from "@/components/index";
import styles from "./Sidebar.module.css";
const Sidebar = ({ ...props }: ComponentPropsWithRef<"div">) => {
  return (
    <div className={styles.sidebar} {...props}>
      <Logo />
      <SidebarLink label="Repositories" link="/repositories" icon="RepoSmall">
        <SidebarLinkChild label="Contributions" />
      </SidebarLink>
      <SidebarLink label="User list" link="/user-list" icon="User" />
    </div>
  );
};

export default Sidebar;
