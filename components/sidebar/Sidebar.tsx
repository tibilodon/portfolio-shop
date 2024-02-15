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
type Props = {
  categories: ({
    parent: {
      id: number;
      createdAt: Date;
      updatedAt: Date | null;
      name: string;
      parentId: number | null;
    } | null;
    subcategories: {
      id: number;
      createdAt: Date;
      updatedAt: Date | null;
      name: string;
      parentId: number | null;
    }[];
  } & {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    name: string;
    parentId: number | null;
  })[];
};

const Sidebar: React.FunctionComponent<Props> = ({ categories }) => {
  const { sidebar, setSidebar, setHeader, setPrevHeader, setSidebarLayer } =
    useAppProvider();

  const onCloseHandler = () => {
    setSidebar(false);

    //in order to be in sync with CSS transition
    setTimeout(() => {
      setHeader("");
    }, 300);
  };

  //  filter categories
  const j: any = jsonData;
  const mainCategories = categories.filter((cats) => !cats.parent);
  console.log(mainCategories);

  //  represents the categories with parent categories - default value can be the first element or null
  //TODO:
  const [current, setCurrent] = useState<any[]>(Object.keys(j["Bows"]));
  console.log("current", current);
  const [alt, setAlt] = useState();
  const altCategoriesHandler = (item: string) => {
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
          {/* {Object.keys(jsonData).map((item, i) => {
            return (
              <div
                onClick={() => altCategoriesHandler(item)}
                key={i}
                className={styles.menuItems}
              >
                <span>{item}</span>
                <NavForwardButton />
              </div>
            );
          })} */}
          {mainCategories.map((items) => {
            return (
              <div
                onClick={() => altCategoriesHandler(items.name)}
                key={items.id}
                className={styles.menuItems}
              >
                <span>{items.name}</span>
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
