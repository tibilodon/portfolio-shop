"use client";
import styles from "../navigateButtons.module.css";
import Image from "next/image";
import icon from "@/public/icons/close.svg";

type Props = { handler: React.MouseEventHandler<HTMLImageElement> };

const NavCloseButton: React.FunctionComponent<Props> = ({ handler }) => {
  return (
    <>
      <Image
        onClick={handler}
        className={styles.wrap}
        src={icon}
        width={30}
        height={30}
        alt="close icon"
      />
    </>
  );
};

export default NavCloseButton;
