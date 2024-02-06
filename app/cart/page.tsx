import styles from "./page.module.css";
import { getAllCookies, deleteCookie } from "@/utils/cookieActions";
import EmptyCart from "@/components/pages/cart/cartItem/emptyCart/EmptyCart";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import dataSet from "@/utils/dataset.json";
import { filterCookieData, findKey } from "@/utils/helpers";
import AddToCartBtn from "@/components/buttons/navigate/addToCart/AddToCartBtn";
import TestDel from "./TestDel";
import Images from "@/components/images/Images";
import Link from "next/link";

export default async function Cart() {
  const data: RequestCookie[] | undefined = await getAllCookies();
  const cartData = [];

  if (data?.length) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.name !== "tnc") {
        const separate = filterCookieData(element.name);

        if (separate) {
          let oriData = findKey(dataSet, separate.product);
          if (oriData) {
            let modData = { ...oriData };
            modData.product = separate.product;
            modData.selectedAmount = Number(element.value);
            modData.selectedVariant = separate.variant;
            cartData.push(modData);
          }
        }
      }
    }
  }

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
                  <Images alt={item.product} image={item.image} />

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
        </div>
      ) : (
        <div className={styles.emptyWrap}>
          <EmptyCart />
        </div>
      )}
    </>
  );
}
