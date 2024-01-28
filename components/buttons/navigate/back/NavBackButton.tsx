"use client";
import styles from "../navigateButtons.module.css";
import Image from "next/image";
import icon from "@/public/icons/back.svg";
type Props = { handler?: React.MouseEventHandler<HTMLSpanElement> };

const NavBackButton: React.FunctionComponent<Props> = ({ handler }) => {
  return (
    <>
      <span className={styles.wrap} onClick={handler}>
        <Image src={icon} alt="forward icon" width={30} height={30} />
      </span>
    </>
  );
};

export default NavBackButton;
