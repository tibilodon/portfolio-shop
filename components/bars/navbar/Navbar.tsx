import styles from "./navbar.module.css";
import Image from "next/image";
import TestButton from "@/components/test/TestButton";
import Logo from "@/components/logo/Logo";
import Sidebar from "@/components/sidebar/Sidebar";
type Props = {};

const Navbar: React.FunctionComponent = (props: Props) => {
  return (
    <>
      <div className={styles.wrap}>
        <Sidebar />
        <span className={styles.icon}>
          <Logo />
        </span>
      </div>
    </>
  );
};

export default Navbar;
