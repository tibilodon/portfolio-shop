import styles from "./navbar.module.css";
import Image from "next/image";
import Logo from "@/components/logo/Logo";
import ShowSidebar from "@/components/sidebar/showSidebar/ShowSidebar";
import account from "@/public/icons/account.svg";
import cart from "@/public/icons/cart.svg";
import CartIcon from "@/components/pages/cart/icon/CartIcon";
import CartItems from "@/components/pages/cart/icon/CartItems";
type Props = {};

const Navbar: React.FunctionComponent = (props: Props) => {
  return (
    <>
      <div className={styles.wrap}>
        <ShowSidebar />
        <span className={styles.icon}>
          <Logo />
        </span>
        <div className={styles.items}>
          {/*v2 only*/}
          {/* <Image
            height={25}
            width={25}
            className={styles.item}
            src={account}
            alt="person icon"
          /> */}

          <CartIcon />
          <CartItems />
        </div>
      </div>
    </>
  );
};

export default Navbar;
