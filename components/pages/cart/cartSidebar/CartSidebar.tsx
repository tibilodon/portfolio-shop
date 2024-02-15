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
import { filterCookieData } from "@/utils/helpers";
import { deleteCookie } from "@/utils/cookieActions";

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

  const deleteItem = (product: string) => {
    deleteCookie(product);
    router.refresh();
  };

  const linker = (prod: string) => {
    const separate = filterCookieData(prod);
    if (separate?.product) {
      console.log("seem", separate.product);
      router.push(`/collections/products/${separate.product}`);
      onCloseHandler();
    }
    return;
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
          {data?.length ? (
            <>
              <button className={styles.toCheckoutBtn} onClick={handler}>
                proceed to cart
              </button>
              {data.map((item, i: number) => {
                return (
                  <div key={i} className={styles.cartItems}>
                    <span onClick={() => linker(item.name)}>
                      <CartItem
                        product={item.name}
                        value={item.value}
                        prismaData={prismaData}
                      />
                    </span>
                    <button onClick={() => deleteItem(item.name)}>
                      delete item
                    </button>
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
