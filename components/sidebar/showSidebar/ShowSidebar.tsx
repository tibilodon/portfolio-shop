"use client";
import styles from "./showSidebar.module.css";
import { useAppProvider } from "@/utils/context/appContext";
import Image from "next/image";
import icon from "@/public/icons/menu.svg";
type Props = {};

const ShowSidebar: React.FunctionComponent<Props> = () => {
  const { sidebar, setSidebar } = useAppProvider();
  const handler = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <div className={styles.wrap} onClick={handler}>
        <Image
          width={25}
          height={25}
          src={icon}
          alt="menu icon"
          className={styles.icon}
        />
        <h4>Termékek</h4>
      </div>
    </>
  );
};

export default ShowSidebar;
