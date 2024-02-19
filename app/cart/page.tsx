import styles from "./page.module.css";
import { getAllCookies } from "@/utils/cookieActions";
import EmptyCart from "@/components/pages/cart/cartItem/emptyCart/EmptyCart";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { fromCookieToDbData } from "@/utils/helpers";
import DeleteFromCookies from "../../components/pages/cart/buttons/deleteFromCookies/DeleteFromCookies";
import Link from "next/link";
import prisma from "@/prisma/prismaClient";
import Image from "next/image";
import { ProductType } from "../page";
import ProductCard from "@/components/cards/product/ProductCard";
import IncreaseDecrease from "@/components/selector/increaseDecrease/IncreaseDecrease";

export default async function Cart() {
  const data: RequestCookie[] | undefined = await getAllCookies();
  //filter out tnc
  // const cookieData = data?.filter((item) => item.name !== "tnc");
  // const filteredCookieData = [];
  // if (cookieData) {
  //   for (let index = 0; index < cookieData.length; index++) {
  //     const element = cookieData[index];
  //     const res = filterCookieData(element);
  //     if (res) {
  //       filteredCookieData.push(res);
  //     }
  //   }
  // }
  const dbData = await prisma.product.findMany({
    include: {
      variants: true,
      //images:true
    },
  });

  //  find match in db
  const results = fromCookieToDbData(data, dbData);

  //  find product and variant based on cookieData

  return (
    <>
      {results.length ? (
        <div className={styles.wrap}>
          {results.map((items, i) => {
            const {
              name,
              price,
              variants,
              imageUrl,
              cookieName,
              selectedAmount,
              stock,
            } = items;
            return (
              <div key={i}>
                <Link
                  className={styles.items}
                  href={`/collections/products/${name}`}
                >
                  <h4>name: {name}</h4>
                  <h4>price: {variants.price ? variants.price : price}</h4>
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

                <IncreaseDecrease
                  cookieName={cookieName}
                  currentAmount={selectedAmount}
                  stock={variants.stock ? variants.stock : stock}
                />
                <DeleteFromCookies
                  product={cookieName}
                  label={"delete product"}
                />
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
