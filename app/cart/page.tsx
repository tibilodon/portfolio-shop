import styles from "./page.module.css";
import { getAllCookies, deleteCookie } from "@/utils/cookieActions";
import EmptyCart from "@/components/pages/cart/cartItem/emptyCart/EmptyCart";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { CartData } from "@/utils/helpers";
import AddToCartBtn from "@/components/buttons/navigate/addToCart/AddToCartBtn";
import TestDel from "./TestDel";
import Images from "@/components/images/Images";
import Link from "next/link";

export default async function Cart() {
  const data: RequestCookie[] | undefined = await getAllCookies();
  const cartDataInstance = new CartData(data);
  const cartData = cartDataInstance.getCartData();

  return (
    <>
      {cartData.length ? (
        <div className={styles.wrap}>
          {cartData.map((item, i) => {
            return (
              <span key={i}>
                <Link href={`/collections/products/${item.product}`}>
                  <h1>prod name:</h1>
                  {item.product}
                  <Images alt={item.product} image={item.img} />

                  <AddToCartBtn
                    productName={item.product}
                    stock={item.stock}
                    variant_1={item.variant_1}
                    variant_2={item.variant_2}
                    selectedAmount={item.selectedAmount}
                    selectedVariant={item.selectedVariant}
                  />
                  <TestDel
                    product={`${item.product}__${item.selectedVariant}`}
                  />
                </Link>
              </span>
            );
          })}
          <Link href={"/checkout"}>
            <button>proceed to checkout</button>
          </Link>
        </div>
      ) : (
        <div className={styles.emptyWrap}>
          <EmptyCart />
        </div>
      )}
    </>
  );
}
