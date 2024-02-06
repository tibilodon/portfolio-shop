import data from "@/utils/dataset.json";
import TempBtn from "./TempBtn";
import AddToCartBtn from "@/components/buttons/navigate/addToCart/AddToCartBtn";

export default function ProductDetails({
  params,
}: {
  params: { productName: string };
}) {
  const keyName = params.productName.replace(/%20/g, " ").replace(/%26/g, "&");

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
      <h1>product details</h1>
      <h1>{keyName}</h1>
      {[pageData].map((item: any, i: number) => {
        return (
          <span key={i}>
            <p>{item.id}</p>
            <p>{item.stock}</p>
            <p>{item.desc}</p>
            <AddToCartBtn
              productName={keyName}
              stock={item.stock}
              variant_1={item.variant_1}
              variant_2={item.variant_2}
            />
          </span>
        );
      })}
    </>
  );
}
