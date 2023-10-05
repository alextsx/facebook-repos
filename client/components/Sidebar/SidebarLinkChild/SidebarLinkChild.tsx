import { Union } from "@/assets/index";
import Image from "next/image";
import styles from "./SidebarLinkChild.module.css";
const SidebarLinkChild = ({ label }: { label: string }) => {
  return (
    <div className={styles.container}>
      <Image src={Union} alt={`union icon`} />
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default SidebarLinkChild;
