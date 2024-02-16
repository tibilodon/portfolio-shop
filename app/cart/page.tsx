import styles from "./page.module.css";
import { getAllCookies, deleteCookie } from "@/utils/cookieActions";
import EmptyCart from "@/components/pages/cart/cartItem/emptyCart/EmptyCart";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { CartData, filterCookieData } from "@/utils/helpers";
import AddToCartBtn from "@/components/buttons/navigate/addToCart/AddToCartBtn";
import TestDel from "./TestDel";
import Images from "@/components/images/Images";
import Link from "next/link";
import prisma from "@/prisma/prismaClient";
import Image from "next/image";

export default async function Cart() {
  const data: RequestCookie[] | undefined = await getAllCookies();
  //filter out tnc
  const cookieData = data?.filter((item) => item.name !== "tnc");
  const filteredCookieData = [];
  if (cookieData) {
    for (let index = 0; index < cookieData.length; index++) {
      const element = cookieData[index];
      const res = filterCookieData(element.name);
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

  //  find product and variant based on cookieData
  // console.log("results", results);
  const cartDataInstance = new CartData(data, dbData);
  const cartData = cartDataInstance.getCartData();

  return (
    <>
      {/* {
      cartData.length ? (
        <div className={styles.wrap}>
          {cartData.map((item, i) => {
            return (
              <span key={i}>
                <Link
                  className={styles.items}
                  href={`/collections/products/${item.product}`}
                >
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
                </Link>
                <TestDel product={`${item.product}__${item.selectedVariant}`} />
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
      )} */}
      {results.length ? (
        <div className={styles.wrap}>
          {results.map((items, i) => {
            const { name, price, variants, imageUrl, cookieName } = items;
            return (
              <div key={i}>
                <Link
                  className={styles.items}
                  href={`/collections/products/${name}`}
                >
                  <h4>name: {name}</h4>
                  <h4>price: {price}</h4>
                  {imageUrl && (
                    <Image
                      width={100}
                      height={100}
                      src={imageUrl}
                      alt={`image of product: ${name}`}
                    />
                  )}
                  {variants.name && <h5>variant: {variants.name}</h5>}
                </Link>
                <TestDel product={cookieName} />
              </div>
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
