"use client";
import styles from "./logo.module.css";
import Image from "next/image";
import arrow from "@/public/icons/arrow.svg";
import logo from "@/public/icons/shop_logo.png";
import { useAppProvider } from "@/utils/context/appContext";
import Link from "next/link";

type Props = {};

const Logo = (props: Props) => {
  const { animate } = useAppProvider();

  return (
    <>
      <Link href={"/"}>
        <div className={styles.wrap}>
          <Image
            src={logo}
            width={120}
            height={102}
            alt="target icon"
            className={styles.target}
          />
          <Image
            src={arrow}
            width={80}
            height={70}
            alt="arrow icon"
            className={
              !animate ? styles.arrow : `${styles.arrow} ${styles.animate}`
            }
          />
        </div>
      </Link>
    </>
  );
};

export default Logo;
