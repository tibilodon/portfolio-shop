"use client";
import styles from "./sidebar.module.css";
import { useAppProvider } from "@/utils/context/appContext";
import Image from "next/image";
import closeIcon from "@/public/icons/close.svg";
import TestSidebar from "../test/TestSidebar";

import { useState } from "react";
type Props = {};

const Sidebar: React.FunctionComponent<Props> = () => {
  const { sidebar, setSidebar, header, setHeader } = useAppProvider();

  // const [header, setHeader] = useState<string>("");

  const items = [
    "Bows",
    "Bow Accessories",
    "Arrows",
    "Shooting accessories",
    "Targets",
    "Tools",
  ];

  const onCloseHandler = () => {
    setSidebar(false);

    //in order to be in sync with CSS transition
    setTimeout(() => {
      setHeader("");
    }, 300);
  };

  const [test, setTest] = useState(false);
  const [test2, setTest2] = useState(false);

  const testHandler = (item: string) => {
    console.log("clicked");
    setTest(true);
    setHeader(item);
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
          {items.map((item, i) => {
            return (
              <div
                onClick={() => testHandler(item)}
                key={i}
                className={styles.menuItems}
              >
                <span>{item}</span>
                <span>{">"}</span>
              </div>
            );
          })}
        </div>
      </div>
      <TestSidebar state={test} setState={setTest} />
      <TestSidebar state={test2} setState={setTest2} />
      {/* </div> */}
    </>
  );
};

export default Sidebar;
