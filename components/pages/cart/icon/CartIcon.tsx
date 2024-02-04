"use client";
import styles from "./cartIcon.module.css";
import Image from "next/image";
import icon from "@/public/icons/cart.svg";
// import CartItems from "./CartItems";
import { useAppProvider } from "@/utils/context/appContext";
import CartSidebar from "../cartSidebar/CartSidebar";

type Props = {};

const CartIcon: React.FunctionComponent<Props> = () => {
  const { setCart } = useAppProvider();

  return (
    <>
      <div className={styles.wrap}>
        <Image
          onClick={() => setCart(true)}
          height={25}
          width={25}
          className={styles.item}
          src={icon}
          alt="cart icon"
        />
        {/*Cart items counter*/}
        {/* <CartItems /> */}
      </div>
      {/* <CartSidebar testData="" /> */}
    </>
  );
};

export default CartIcon;
