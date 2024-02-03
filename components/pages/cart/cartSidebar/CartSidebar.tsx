"use client";
import styles from "@/components/sidebar/sidebar.module.css";
import { useState } from "react";
import { useAppProvider } from "@/utils/context/appContext";
import NavCloseButton from "@/components/buttons/navigate/close/NavCloseButton";
import icon from "@/public/icons/empty_target.svg";
import Image from "next/image";
import CartItem from "../cartItem/CartItem";

type Props = {
  testData?: string;
};

const CartSidebar: React.FunctionComponent<Props> = ({ testData }) => {
  const { cart, setCart } = useAppProvider();

  const onCloseHandler = () => {
    setCart(false);

    //in order to be in sync with CSS transition
  };

  return (
    <div
      className={cart ? `${styles.sidebar} ${styles.active}` : styles.sidebar}
    >
      <div className={styles.items}>
        <span
          style={{ justifyContent: "space-between" }}
          className={styles.header}
        >
          <h3>Kosár</h3>

          <NavCloseButton handler={onCloseHandler} />
        </span>
        {/* {items &&
          items.map((item, i) => {
            return (
              <div
                onClick={() => handler(item)}
                key={i}
                className={styles.menuItems}
              >
                {item}
                <NavForwardButton />
              </div>
            );
          })} */}
        <div className={styles.menuItems}>
          <CartItem testData={testData} />
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
