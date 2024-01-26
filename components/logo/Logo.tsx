"use client";
import styles from "./logo.module.css";
import Image from "next/image";
import arrow from "@/public/icons/arrow.svg";
import logo from "@/public/icons/shop_logo.png";
import { useAppProvider } from "@/utils/context/appContext";

type Props = {};

const Logo = (props: Props) => {
  const { animate } = useAppProvider();

  return (
    <>
      <div className={styles.wrap}>
        <Image
          src={logo}
          width={120}
          height={102}
          alt="test target"
          className={styles.target}
        />
        <Image
          src={arrow}
          width={80}
          height={70}
          alt="test arrow"
          className={
            !animate ? styles.arrow : `${styles.arrow} ${styles.animate}`
          }
        />
      </div>
    </>
  );
};

export default Logo;
