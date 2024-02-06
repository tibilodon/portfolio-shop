import styles from "./page.module.css";
import data from "@/utils/dataset.json";
import Link from "next/link";
import AddToCartBtn from "@/components/buttons/navigate/addToCart/AddToCartBtn";
import Image from "next/image";
import { findKey } from "@/utils/helpers";

import Images from "@/components/images/Images";

export default function CollectionDetails({
  params,
}: {
  params: { collectionName: string };
}) {
  const keyName = params.collectionName
    .replace(/%20/g, " ")
    .replace(/%26/g, "&");

  const pageData = findKey(data, keyName);

  return (
    <>
      <div className={styles.wrap}>
        <h1>collection details</h1>
        {/* <h1>{params.collectionName}</h1> */}
        <h1>{keyName}</h1>
        {Object.keys(pageData).map((item, i) => {
          return (
            <span key={i}>
              <h3>PRODUCT: {item}</h3>

              {[pageData[item]].map((val, j: number) => {
                return (
                  <div key={j}>
                    <Link href={"/collections/products/" + item}>
                      <p>id: {val.id}</p>
                      <p>stock: {val.stock}</p>
                      <p>desc: {val.desc}</p>

                      <Images image={val.img} alt={item} />
                    </Link>
                    <AddToCartBtn
                      productName={item}
                      variant_1={val.variant_1}
                      variant_2={val.variant_2}
                      stock={Number(val.stock)}
                    />
                  </div>
                );
              })}
            </span>
          );
        })}
      </div>
    </>
  );
}
