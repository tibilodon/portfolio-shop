"use client";
import styles from "../sidebarLayer.module.css";
import { useAppProvider } from "@/utils/context/appContext";
import Image from "next/image";
import closeIcon from "@/public/icons/close.svg";
import NavBackButton from "@/components/buttons/navigate/back/NavBackButton";

type Props = {
  items?: string[];
};

const SidebarLayer2: React.FunctionComponent<Props> = ({ items }) => {
  const {
    setSidebar,
    setSidebarLayer,
    sidebarLayer2,
    setSidebarLayer2,
    header,
    setHeader,
    prevHeader,
  } = useAppProvider();

  const onCloseHandler = () => {
    setSidebarLayer(false);
    setSidebarLayer2(false);
    setSidebar(false);

    //in order to be in sync with CSS transition
    setTimeout(() => {
      setHeader("");
    }, 300);
  };

  const onCollapseHandler = () => {
    setSidebarLayer2(false);
    setHeader(prevHeader);
  };

  return (
    <div
      className={
        sidebarLayer2 ? `${styles.sidebar} ${styles.active}` : styles.sidebar
      }
    >
      <div className={styles.items}>
        <span
          className={styles.header}
          style={{ justifyContent: header && "space-between" }}
        >
          {header && (
            <>
              <NavBackButton handler={onCollapseHandler} />
              <h3>{header}</h3>
            </>
          )}
          <Image
            onClick={onCloseHandler}
            className={styles.icon}
            src={closeIcon}
            width={30}
            height={30}
            alt="close icon"
          />
        </span>
        {items &&
          items.map((item, i) => {
            return (
              <div
                onClick={() => setHeader(item)}
                key={i}
                className={styles.menuItems}
              >
                {item}
                {/* <span>{">"}</span> */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SidebarLayer2;
