import data from "@/utils/dataset.json";
import AddToCartBtn from "@/components/buttons/navigate/addToCart/AddToCartBtn";
import Image from "next/image";
import NoImage from "@/components/error/noImage/NoImage";
import { findKey } from "@/utils/helpers";

export default function ProductDetails({
  params,
}: {
  params: { productName: string };
}) {
  const keyName = params.productName.replace(/%20/g, " ").replace(/%26/g, "&");

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
            {item.img ? (
              <Image
                width={50}
                height={50}
                src={item.img}
                alt={`image of ${keyName}`}
              />
            ) : (
              <NoImage />
            )}
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
