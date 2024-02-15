"use client";
import styles from "./wrapper.module.css";
import { useAppProvider } from "@/utils/context/appContext";
type Props = { children: React.ReactNode };

const Wrapper: React.FunctionComponent<Props> = ({ children }) => {
  const { animate, setAnimate, sidebar, setSidebar, cart, setCart } =
    useAppProvider();
  const scrollHandler = (): void => {
    if (!animate) {
      setAnimate(true);
    } else return;
  };

  const sidebarHandler = (): void => {
    if (sidebar) {
      setSidebar(false);
    }
  };

  return (
    <div
      className={styles.wrap}
      onScroll={scrollHandler}
      onWheel={scrollHandler}
      onClick={sidebarHandler}
    >
      {children}
    </div>
  );
};

export default Wrapper;
