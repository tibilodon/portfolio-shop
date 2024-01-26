"use client";
import styles from "./sidebar.module.css";
import { useAppProvider } from "@/utils/context/appContext";
import Image from "next/image";
import icon from "@/public/icons/menu.svg";
type Props = {};

const Sidebar = (props: Props) => {
  const { sidebar, setSidebar } = useAppProvider();
  console.log("sidebar", sidebar);
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.menu} onClick={() => setSidebar(!sidebar)}>
          <Image src={icon} alt="menu icon" className={styles.icon} />
          <h4>Termékek</h4>
        </div>

        <div
          className={
            sidebar ? `${styles.sidebar} ${styles.active}` : styles.sidebar
          }
        >
          <div className={styles.items}>
            <span>item</span>
            <span>item</span>
            <span>item</span>
            <span>item</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
