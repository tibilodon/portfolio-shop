"use client";
import styles from "./cartSidebar.module.css";
import { useAppProvider } from "@/utils/context/appContext";
import NavCloseButton from "@/components/buttons/navigate/close/NavCloseButton";
// import icon from "@/public/icons/empty_target.svg";
// import Image from "next/image";
import CartItem from "../cartItem/CartItem";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import EmptyCart from "../cartItem/emptyCart/EmptyCart";
import { useRouter } from "next/navigation";
import { filterCookieData, fromCookieToDbData } from "@/utils/helpers";
import { deleteCookie } from "@/utils/cookieActions";
import DeleteFromCookies from "../buttons/deleteFromCookies/DeleteFromCookies";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";
import { useEffect } from "react";

type Props = {
  data: RequestCookie[] | undefined;
  //TODO:
  prismaData: any;
};

const CartSidebar: React.FunctionComponent<Props> = ({ data, prismaData }) => {
  const router = useRouter();
  const { cart, setCart } = useAppProvider();

  const onCloseHandler = () => {
    setCart(false);

    //in order to be in sync with CSS transition
  };

  const handler = () => {
    //TODO: can set context in order to "fetch" cart data
    onCloseHandler();
    router.push("/cart");
  };

  let findData;
  if (data?.length && prismaData.length) {
    findData = fromCookieToDbData(data, prismaData);
  }

  // useEffect(() => {
  //   if (!findData) {
  //     router.push("/admin");
  //   }
  // });

  const linker = (product: RequestCookie) => {
    // const separate = filterCookieData(cookie);
    // if (separate?.product) {
    // console.log("seem", separate.product);
    router.push(`/collections/products/${product}`);
    onCloseHandler();
    // }
    // return;
  };
  return (
    <div
      className={cart ? `${styles.sidebar} ${styles.active}` : styles.sidebar}
    >
      <div className={styles.items}>
        <span
          style={{
            justifyContent: "space-between",
          }}
          className={styles.header}
        >
          <h3>Kosár</h3>

          <NavCloseButton handler={onCloseHandler} />
        </span>
        <div className={styles.menuItems}>
          {findData ? (
            <>
              <button className={styles.toCheckoutBtn} onClick={handler}>
                proceed to cart
              </button>
              {findData.map((item, i: number) => {
                const {
                  name,
                  price,
                  selectedAmount,
                  variants,
                  cookieName,
                  // imageUrl,
                } = item;
                return (
                  <div key={i} className={styles.cartItems}>
                    <span onClick={() => linker(name)}>
                      <CartItem
                        name={name}
                        basePrice={price}
                        selectedAmount={selectedAmount}
                        variants={variants}
                        // imageUrl={imageUrl}
                      />
                    </span>

                    <DeleteFromCookies
                      label={"delete product"}
                      product={cookieName}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
