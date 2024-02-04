import styles from "./page.module.css";
import data from "@/utils/dataset.json";
import Link from "next/link";
import AddBtn from "@/components/buttons/navigate/add/AddBtn";
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
  // console.log("Pagedata", pageData);

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
                    </Link>
                    <AddBtn id={item} />
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
