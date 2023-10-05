import { ComponentPropsWithoutRef } from "react";
import { Logo as LogoSvg } from "@/assets/index";
import Image from "next/image";
import styles from "./Logo.module.css";
const Logo = ({ ...props }: ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={styles.logo} data-testid="logo-container" {...props}>
      <Image src={LogoSvg} alt="logo" />
      <h2 className={styles.h2}>BootCamp</h2>
    </div>
  );
};

export default Logo;
