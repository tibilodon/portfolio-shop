import styles from "./page.module.css";
import data from "@/utils/dataset.json";
import Link from "next/link";
import AddToCartBtn from "@/components/buttons/navigate/addToCart/AddToCartBtn";
import Image from "next/image";

import noImg from "@/static/no_image.svg";

export default function CollectionDetails({
  params,
}: {
  params: { collectionName: string };
}) {
  const keyName = params.collectionName
    .replace(/%20/g, " ")
    .replace(/%26/g, "&");

  const findKey = (obj: any, targetKey: string) => {
    if (obj && typeof obj === "object") {
      if (targetKey in obj) {
        return obj[targetKey];
      }
      for (const key in obj) {
        const result: any = findKey(obj[key], targetKey);
        if (result !== undefined) {
          return result;
        }
      }
    }
    return undefined;
  };

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

              {[pageData[item]].map((val: any, j: number) => {
                return (
                  <div key={j}>
                    <Link href={"/collections/products/" + item}>
                      <p>id: {val.id}</p>
                      <p>stock: {val.stock}</p>
                      <p>desc: {val.desc}</p>
                      {val.img ? (
                        <Image
                          width={50}
                          height={50}
                          src={val.img}
                          alt={`image of ${item}`}
                        />
                      ) : (
                        <span className={styles.noImage}>
                          <Image
                            width={50}
                            height={50}
                            src={noImg}
                            alt={`image of ${item}`}
                          />
                          <strong>No Image available</strong>
                        </span>
                      )}
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
