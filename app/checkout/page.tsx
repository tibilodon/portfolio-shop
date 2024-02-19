import styles from "./page.module.css";
import { CartData, filterCookieData } from "@/utils/helpers";
import { getAllCookies, deleteCookie } from "@/utils/cookieActions";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/forms/checkout/CheckoutForm";
import prisma from "@/prisma/prismaClient";

export default async function Checkout() {
  const data: RequestCookie[] | undefined = await getAllCookies();
  //filter out tnc
  const cookieData = data?.filter((item) => item.name !== "tnc");
  const filteredCookieData = [];
  if (cookieData) {
    for (let index = 0; index < cookieData.length; index++) {
      const element = cookieData[index];
      const res = filterCookieData(element);
      if (res) {
        filteredCookieData.push(res);
      }
    }
  }
  const dbData = await prisma.product.findMany({
    include: {
      variants: true,
      //images:true
    },
  });

  //  find match in db
  const results: any[] = [];
  if (dbData && filteredCookieData.length) {
    for (let index = 0; index < dbData.length; index++) {
      const db = dbData[index];
      for (let index = 0; index < filteredCookieData.length; index++) {
        const cookie = filteredCookieData[index];

        if (cookie.product === db.name) {
          //include cookie name for easier deletion

          const findVariant = db.variants.find(
            (vari) => vari.name === cookie.variant
          );
          const modData: any = { ...db };
          modData.cookieName = `${cookie.product}__${cookie.variant}`;
          if (modData.variants.length) {
            delete modData.variants;
            modData.variants = findVariant;

            results.push(modData);
          } else {
            results.push(modData);
          }
        }
      }
    }
  }

  if (!results.length) {
    redirect("/error");
  }

  const overallPrice = () => {
    let price: number = 0;
    for (let index = 0; index < results.length; index++) {
      const el = results[index];
      if (el.variants.length) {
        price += el.variants.price;
      } else {
        price += el.price;
      }
    }
    return price;
  };
  return (
    <>
      <div className={styles.wrap}>
        <h1>hello checkout</h1>
        <div>
          <h3>here is the overall price: {overallPrice()}</h3>
          {/* {cartData.map((item, i) => (
            <div key={i}>
              <span>{item.product}</span>
       
            </div>
          ))} */}
        </div>
        <CheckoutForm />
      </div>
    </>
  );
}
