import styles from "./page.module.css";
import { fromCookieToDbData } from "@/utils/helpers";
import { getAllCookies } from "@/utils/cookieActions";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/forms/checkout/CheckoutForm";
import prisma from "@/prisma/prismaClient";

export default async function Checkout() {
  const data: RequestCookie[] | undefined = await getAllCookies();

  const dbData = await prisma.product.findMany({
    include: {
      variants: true,
      //images:true
    },
  });

  //  find match in db
  const findData = fromCookieToDbData(data, dbData);

  if (!findData) {
    redirect("/error");
  }
  //  calc price
  const calcOverallPrice = (): number => {
    let price: number = 0;
    for (let index = 0; index < findData.length; index++) {
      const el = findData[index];
      if (el.variants) {
        price += el.selectedAmount * el.variants.price;
      } else {
        price += el.selectedAmount * el.price;
      }
    }

    return price;
  };

  return (
    <>
      <div className={styles.wrap}>
        <h1>hello checkout</h1>
        <div>
          <h3>here is the overall price: {calcOverallPrice()}</h3>
        </div>
        <CheckoutForm />
      </div>
    </>
  );
}
