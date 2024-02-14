//  details about a specific product
"use client";
import styles from "./productCard.module.css";
import { useState } from "react";
import Images from "@/components/images/Images";
import Link from "next/link";
import VariantSelector from "@/components/selector/variant/VariantSelector";
import AmountSelector from "@/components/selector/amount/AmountSelector";
import { getCookie, createCookie } from "@/utils/cookieActions";
import { filterCookieData } from "@/utils/helpers";

//TODO: extract
export type VariantType = {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  name: string;
  price: number;
  stock: number;
  productId: number;
};

type Props = {
  image: string;
  productName: string;
  description: string;
  variants: VariantType[];
};

const ProductCard: React.FunctionComponent<Props> = ({
  variants,
  image,
  productName,
  description,
}) => {
  //  state containing the selected variant
  const [selected, setSelected] = useState(variants[0]);
  const [amount, setAmount] = useState<number>(1);
  const { name, price, stock } = selected;

  const setCookie = async () => {
    const cookieName = `${productName}__${name}`;
    const inCart = await getCookie(cookieName);
    if (inCart?.value) {
      const items: number = Number(inCart.value);
      const filterData = filterCookieData(inCart.name);
      if (filterData) {
        if (filterData.variant === name) {
          await createCookie(cookieName, `${items + amount}`);
        }
      }
    } else {
      await createCookie(cookieName, `${amount}`);
    }
  };
  return (
    <>
      <div className={styles.wrap}>
        <h1>PRODUCTCARD</h1>
        <Link href={"/collections/products/" + productName}>
          <h3>prod: {productName}</h3>
          <h3>desc: {description}</h3>
          <h3>PRICE: {price}</h3>
          <Images
            image={image}
            stock={stock}
            alt={`Image representing ${productName} with variant: ${name}`}
          />
        </Link>

        <VariantSelector
          variants={variants}
          state={selected}
          setState={setSelected}
        />
        <AmountSelector selected={stock} state={amount} setState={setAmount} />
        <button onClick={setCookie}>add to cart</button>
      </div>
    </>
  );
};

export default ProductCard;
