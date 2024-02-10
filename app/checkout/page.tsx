import styles from "./page.module.css";
import { CartData } from "@/utils/helpers";
import { getAllCookies, deleteCookie } from "@/utils/cookieActions";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/forms/checkout/CheckoutForm";

export default async function Checkout() {
  //  map out cart items
  //  formData - present shipping and customer data
  //  send formData to api
  const data: RequestCookie[] | undefined = await getAllCookies();

  const cartDataInstance = new CartData(data);
  const cartData = cartDataInstance.getCartData();

  if (!cartData.length) {
    redirect("/");
  }
  return (
    <>
      <div className={styles.wrap}>
        <h1>hello checkout</h1>
        <div>
          {cartData.map((item, i) => (
            <div key={i}>
              <span>{item.product}</span>
              {/* {Object.entries(item).map(([key, value], j: number) => (
                <div key={j}>
                  {key !== "id" && "stock" && (
                    <span>
                      {key}: {value}
                    </span>
                  )}
                </div>
              ))} */}
            </div>
          ))}
        </div>
        <CheckoutForm />
      </div>
    </>
  );
}
