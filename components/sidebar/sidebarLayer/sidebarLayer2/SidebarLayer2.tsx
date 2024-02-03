"use client";
// import styles from "../sidebarLayer.module.css";
import styles from "../../sidebar.module.css";

import { useAppProvider } from "@/utils/context/appContext";
import NavBackButton from "@/components/buttons/navigate/back/NavBackButton";
import NavCloseButton from "@/components/buttons/navigate/close/NavCloseButton";
import { useRouter } from "next/navigation";

type Props = {
  items?: any;
};

const SidebarLayer2: React.FunctionComponent<Props> = ({ items }) => {
  const router = useRouter();
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
        sidebarLayer2
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
        {items &&
          Object.keys(items).map((item: any, i: number) => {
            return (
              <div
                onClick={() => linker(item)}
                key={i}
                className={styles.menuItems}
              >
                {item}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SidebarLayer2;
