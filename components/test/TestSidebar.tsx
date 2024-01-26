"use client";
import styles from "./test.module.css";
import { useAppProvider } from "@/utils/context/appContext";
import Image from "next/image";
import closeIcon from "@/public/icons/close.svg";

import { useState } from "react";

type Props = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<any>>;
};

const TestSidebar: React.FunctionComponent<Props> = ({ state, setState }) => {
  const { sidebar, setSidebar, header, setHeader } = useAppProvider();

  const onCloseHandler = () => {
    setSidebar(false);

    //in order to be in sync with CSS transition
    setTimeout(() => {
      setHeader("");
    }, 300);
  };

  const items = [
    "TEST--Bows",
    "TEST--Bow Accessories",
    "TEST--Arrows",
    "TEST--Shooting accessories",
    "TEST--Targets",
    "TEST--Tools",
  ];

  return (
    <div
      className={state ? `${styles.sidebar} ${styles.active}` : styles.sidebar}
    >
      <div className={styles.items}>
        <span
          className={styles.header}
          style={{ justifyContent: header && "space-between" }}
        >
          {header && (
            <>
              <span onClick={() => setState(false)}> {"<"}</span>
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
        {items.map((item, i) => {
          return (
            <div
              onClick={() => setHeader(item)}
              key={i}
              className={styles.menuItems}
            >
              {item}
              <span>{">"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestSidebar;
