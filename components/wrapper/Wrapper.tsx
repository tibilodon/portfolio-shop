"use client";
import styles from "./wrapper.module.css";
import { useAppProvider } from "@/utils/context/appContext";
type Props = { children: React.ReactNode };

const TestWrap: React.FunctionComponent<Props> = ({ children }) => {
  const { animate, setAnimate, sidebar, setSidebar } = useAppProvider();
  const scrollHandler = (): void => {
    if (!animate) {
      setAnimate(true);
    } else return;
  };

  const sidebarHandler = (): void => {
    if (sidebar) {
      setSidebar(false);
    } else return;
  };

  return (
    <div
      onScroll={scrollHandler}
      onWheel={scrollHandler}
      onClick={sidebarHandler}
    >
      {children}
    </div>
  );
};

export default TestWrap;
