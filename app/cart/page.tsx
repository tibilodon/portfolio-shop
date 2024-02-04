import styles from "./page.module.css";
import { getAllCookies, deleteCookie } from "@/utils/cookieActions";
import EmptyCart from "@/components/pages/cart/cartItem/emptyCart/EmptyCart";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

//  TODO:>get data from cookies, if empty return slide-in / sidebar type empty cart page

export default async function Cart() {
  const data: RequestCookie[] | undefined = await getAllCookies();

  return (
    <>
      {data?.length ? (
        <div className={styles.wrap}>
          <h1>hello cart</h1>
          {data.map(({ name, value }, i: number) => {
            return (
              <div key={i} className={styles.items}>
                <h1>{name}</h1>
                <h1>{value}</h1>
              </div>
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
