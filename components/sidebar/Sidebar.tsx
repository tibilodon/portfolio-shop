"use client";
import styles from "./sidebar.module.css";
import { useAppProvider } from "@/utils/context/appContext";
import { useState } from "react";
import SidebarLayer1 from "./sidebarLayer/sidebarLayer1/SidebarLayer1";
import NavForwardButton from "../buttons/navigate/forward/NavForwardButton";
import NavCloseButton from "../buttons/navigate/close/NavCloseButton";
import { recursiveFilter } from "@/utils/helpers";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
  const mainCategories = categories.filter((cats) => !cats.parent);

  const [isSelected, setIsSelected] = useState<any[]>([]);

  //  pass in name & id and find corresponding subCategories
  const altCategoriesHandler = (item: string, id: number) => {
    const result: any[] = [];
    recursiveFilter(mainCategories, id, result);
    if (!result.length) {
      linker(item);
      return;
    }
    setIsSelected(result);
    setSidebarLayer(true);
    setHeader(item);
    setPrevHeader(item);
  };

  //TODO: create class
  const linker = (item: string) => {
    const regex = /\s]+/g;
    const page = item.replaceAll(regex, "-");
    console.log("page", page);
    onCloseHandler();
    router.push("/collections/" + item);
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
          {mainCategories.map((items) => {
            return (
              <div
                onClick={
                  // isSelected.length
                  // ?
                  () => altCategoriesHandler(items.name, items.id)
                  // : () => linker(items.name)
                }
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
      {isSelected && <SidebarLayer1 selected={isSelected} />}
    </>
  );
};

export default Sidebar;
