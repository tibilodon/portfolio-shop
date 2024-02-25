"use client";
import styles from "../../sidebar.module.css";
import { useState } from "react";
import { useAppProvider } from "@/utils/context/appContext";
import SidebarLayer2 from "../sidebarLayer2/SidebarLayer2";
import NavForwardButton from "@/components/buttons/navigate/forward/NavForwardButton";
import NavBackButton from "@/components/buttons/navigate/back/NavBackButton";
import NavCloseButton from "@/components/buttons/navigate/close/NavCloseButton";
import { recursiveFilter } from "@/utils/helpers";
import { useRouter } from "next/navigation";

type Props = {
  selected: any[];
};

const SidebarLayer1: React.FunctionComponent<Props> = ({ selected }) => {
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

  // const [current, setCurrent] = useState();
  const [isSelected, setIsSelected] = useState<any[]>([]);

  const handler = (item: string, id: number) => {
    const result: any[] = [];

    recursiveFilter(selected, id, result);

    if (!result.length) {
      linker(item);
      return;
    }
    setIsSelected(result);
    setSidebarLayer2(true);
    setTimeout(() => {
      setHeader(item);
    }, 100);
  };

  const router = useRouter();
  const linker = (item: string) => {
    const regex = /\s]+/g;
    const page = item.replaceAll(regex, "-");
    console.log("page", page);
    onCloseHandler();
    router.push("/collections/" + item);
  };

  return (
    <div
      className={
        sidebarLayer
          ? `${styles.sidebar} ${styles.layer} ${styles.active}`
          : styles.sidebar
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

          <NavCloseButton handler={onCloseHandler} />
        </span>
        {selected &&
          selected.map((items) => {
            return (
              <div
                onClick={
                  () => handler(items.name, items.id)
                  // isSelected.length
                  //   ? () => handler(items.name, items.id)
                  //   : () => linker(items.name)
                }
                key={items.id}
                className={styles.menuItems}
              >
                {items.name}
                <NavForwardButton />
              </div>
            );
          })}
      </div>

      {isSelected.length && <SidebarLayer2 selected={isSelected} />}
    </div>
  );
};

export default SidebarLayer1;
