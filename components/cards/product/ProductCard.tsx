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
  // image: string;
  productName: string;
  description: string;
  variants: VariantType[];
  basePrice: number;
  baseStock: number;
};

const ProductCard: React.FunctionComponent<Props> = ({
  variants,
  // image,
  productName,
  description,
  basePrice,
  baseStock,
}) => {
  //  state containing the selected variant
  const [amount, setAmount] = useState<number>(1);

  const [selected, setSelected] = useState<VariantType | null>(
    variants.length ? variants[0] : null
  );

  //TODO: rework this:
  const setCookie = async () => {
    const cookieName = `${productName}__${selected && selected.name}`;
    const inCart = await getCookie(cookieName);
    if (inCart?.value) {
      const items: number = Number(inCart.value);
      const filterData = filterCookieData(inCart);
      if (filterData) {
        if (filterData.variant === selected?.name) {
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
          <h3>PRICE: {selected ? selected.price : basePrice}</h3>
          {/* <Images
            image={image}
            stock={selected ? selected.stock : baseStock}
            alt={`Image representing ${productName} ${
              selected ? " with variant: " + selected.name : ""
            }`}
          /> */}
        </Link>

        {selected && (
          <VariantSelector
            variants={variants}
            state={selected}
            setState={setSelected}
          />
        )}
        <AmountSelector
          selected={selected ? selected.stock : baseStock}
          state={amount}
          setState={setAmount}
        />
        <button onClick={setCookie}>add to cart</button>
      </div>
    </>
  );
};

export default ProductCard;
