import { PropsWithChildren, memo } from "react";
import styles from "./TableCell.module.css";
const TableCell = ({ children }: PropsWithChildren) => {
  return <td className={styles.td}>{children}</td>;
};

export default memo(TableCell);
