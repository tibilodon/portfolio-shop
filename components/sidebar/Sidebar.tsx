"use client";
import styles from "./sidebar.module.css";
import { useAppProvider } from "@/utils/context/appContext";
import Image from "next/image";
import closeIcon from "@/public/icons/close.svg";

import { useState } from "react";
import SidebarLayer1 from "./sidebarLayer/sidebarLayer1/SidebarLayer1";

import jsonData from "@/utils/dataset.json";
import NavForwardButton from "../buttons/navigate/forward/NavForwardButton";
import NavCloseButton from "../buttons/navigate/close/NavCloseButton";
type Props = {};

const Sidebar: React.FunctionComponent<Props> = () => {
  const { sidebar, setSidebar, setHeader, setPrevHeader, setSidebarLayer } =
    useAppProvider();

  const onCloseHandler = () => {
    setSidebar(false);

    //in order to be in sync with CSS transition
    setTimeout(() => {
      setHeader("");
    }, 300);
  };

  const j: any = jsonData;
  const [current, setCurrent] = useState<any>(Object.keys(j["Bows"]));
  const [alt, setAlt] = useState();
  const testHandler = (item: string) => {
    if (item && j[item]) {
      setCurrent(Object.keys(j[item]));
      setAlt(j[item]);
    }
    setSidebarLayer(true);
    // setTest(true);
    setHeader(item);
    setPrevHeader(item);
  };

  return (
    <>
      <div
        className={
          sidebar ? `${styles.sidebar} ${styles.active}` : styles.sidebar
        }
      >
        <div className={styles.items}>
          <span className={styles.header}>
            <NavCloseButton handler={onCloseHandler} />
          </span>
          {Object.keys(jsonData).map((item, i) => {
            return (
              <div
                onClick={() => testHandler(item)}
                key={i}
                className={styles.menuItems}
              >
                <span>{item}</span>
                <NavForwardButton />
              </div>
            );
          })}
        </div>
      </div>
      <SidebarLayer1 items={current} altItems={alt} />
    </>
  );
};

export default Sidebar;
