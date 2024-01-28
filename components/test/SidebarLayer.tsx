"use client";
import styles from "./test.module.css";
import { useAppProvider } from "@/utils/context/appContext";
import Image from "next/image";
import closeIcon from "@/public/icons/close.svg";

import { useState } from "react";

type Props = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<any>>;
  items?: string[];
};

const SidebarLayer: React.FunctionComponent<Props> = ({
  state,
  setState,
  items,
}) => {
  const { sidebar, setSidebar, header, setHeader } = useAppProvider();

  const onCloseHandler = () => {
    setSidebar(false);

    //in order to be in sync with CSS transition
    setTimeout(() => {
      setHeader("");
    }, 300);
  };

  const [testState, setTestState] = useState<boolean>(false);
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
        {items &&
          items.map((item, i) => {
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
      {/* <SidebarLayer
        altItems={altItems}
        setState={setTestState}
        state={testState}
      /> */}
    </div>
  );
};

export default SidebarLayer;
