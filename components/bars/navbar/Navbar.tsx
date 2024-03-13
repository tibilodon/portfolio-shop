import styles from "./navbar.module.css";
import Image from "next/image";
import Logo from "@/components/logo/Logo";
import ShowSidebar from "@/components/sidebar/showSidebar/ShowSidebar";
import account from "@/public/icons/account.svg";
import CartIcon from "@/components/pages/cart/icon/CartIcon";
import CartItems from "@/components/pages/cart/icon/CartItems";
import Link from "next/link";

type Props = {};

const Navbar: React.FunctionComponent = () => {
  return (
    <>
      <div className={styles.wrap}>
        <ShowSidebar />
        <span className={styles.icon}>
          <Logo />
        </span>
        <div className={styles.items}>
          {/*v2 only*/}
          <Link href={"/auth/profile"}>
            <Image
              height={25}
              width={25}
              className={styles.item}
              src={account}
              alt="person icon"
            />
          </Link>

          <CartIcon />
          <CartItems />
        </div>
      </div>
    </>
  );
};

export default Navbar;
