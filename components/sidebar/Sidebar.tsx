"use client";
import styles from "./sidebar.module.css";
import { useAppProvider } from "@/utils/context/appContext";
import Image from "next/image";
import closeIcon from "@/public/icons/close.svg";
import TestSidebar from "../test/TestSidebar";

import { useState } from "react";
import SidebarLayer1 from "./sidebarLayer/sidebarLayer1/SidebarLayer1";

import jsonData from "@/utils/dataset.json";
import data from "@/utils/data";
import NavForwardButton from "../buttons/navigate/forward/NavForwardButton";
type Props = {};

const Sidebar: React.FunctionComponent<Props> = () => {
  const {
    sidebar,
    setSidebar,
    header,
    setHeader,
    prevHeader,
    setPrevHeader,
    sidebarLayer,
    setSidebarLayer,
  } = useAppProvider();

  const onCloseHandler = () => {
    setSidebar(false);

    //in order to be in sync with CSS transition
    setTimeout(() => {
      setHeader("");
    }, 300);
  };

  const [bowState, setBowState] = useState(false);
  const [bowAccessoriesState, setBowAccessoriesState] = useState(false);

  const j: any = jsonData;
  const [current, setCurrent] = useState<any>(Object.keys(j["Bows"]));
  const [alt, setAlt] = useState();
  // const [mainHeader, setMainHeader] = useState("");
  console.log(alt);
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
          <span
            className={styles.header}
            // style={{ justifyContent: header && "space-between" }}
          >
            {/* {header && <h3>{header}</h3>} */}
            <Image
              onClick={onCloseHandler}
              className={styles.icon}
              src={closeIcon}
              width={30}
              height={30}
              alt="close icon"
            />
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
      {/* <TestSidebar
        state={test}
        setState={setTest}
        items={items1}
        altItems={items2}
      />
      <TestSidebar
        items={items1}
        state={test2}
        setState={setTest2}
        altItems={items2}
      /> */}
      {/* <SidebarLayer1
        state={bowState}
        setState={setBowState}
        items={items1}
        altItems={items2}
      /> */}

      <SidebarLayer1
        // state={bowState}
        // setState={setBowState}
        items={current}
        altItems={alt}
        // mainHeader={mainHeader}
      />
    </>
  );
};

export default Sidebar;
