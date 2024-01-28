"use client";
import styles from "../sidebarLayer.module.css";
import { useState } from "react";
import { useAppProvider } from "@/utils/context/appContext";
import Image from "next/image";
import closeIcon from "@/public/icons/close.svg";
import SidebarLayer2 from "../sidebarLayer2/SidebarLayer2";
import NavForwardButton from "@/components/buttons/navigate/forward/NavForwardButton";
import NavBackButton from "@/components/buttons/navigate/back/NavBackButton";

type Props = {
  items: string[];
  altItems?: any;
};

const SidebarLayer1: React.FunctionComponent<Props> = ({ items, altItems }) => {
  const {
    setSidebar,
    sidebarLayer,
    setSidebarLayer,
    setSidebarLayer2,
    header,
    setHeader,
  } = useAppProvider();

  const onCloseHandler = () => {
    setSidebarLayer(false);
    setSidebar(false);

    //in order to be in sync with CSS transition
    setTimeout(() => {
      setHeader("");
    }, 300);
  };

  const onCollapseHandler = () => {
    setSidebarLayer(false);
    setTimeout(() => {
      setHeader("");
    }, 300);
  };

  const [current, setCurrent] = useState();

  const handler = (item: string) => {
    setCurrent(altItems[item]);
    setSidebarLayer2(true);
    setTimeout(() => {
      setHeader(item);
    }, 100);
  };

  return (
    <div
      className={
        sidebarLayer ? `${styles.sidebar} ${styles.active}` : styles.sidebar
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
                onClick={() => handler(item)}
                key={i}
                className={styles.menuItems}
              >
                {item}
                <NavForwardButton />
              </div>
            );
          })}
      </div>

      <SidebarLayer2 items={current} />
    </div>
  );
};

export default SidebarLayer1;
