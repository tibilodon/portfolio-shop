"use client";
import styles from "./addToCartBtn.module.css";
import { getCookie, createCookie, deleteCookie } from "@/utils/cookieActions";
import { useState } from "react";
import { filterCookieData } from "@/utils/helpers";
import VariantSelector from "@/components/selector/variant/VariantSelector";
import AmountSelector from "@/components/selector/amount/AmountSelector";

type Props = {
  productName: string;
  variant_1: string;
  variant_2: string;
  stock: number;
};

//TODO: handle variants
const AddToCartBtn: React.FunctionComponent<Props> = ({
  productName,
  variant_1,
  variant_2,
  stock,
}) => {
  const [selected, setSelected] = useState(variant_1);
  const [amount, setAmount] = useState(1);
  const variantsArray = [variant_1, variant_2];

  //cookie: productName__variant:value
  const setCookie = async () => {
    const cookieName = `${productName}__${selected}`;
    const inCart = await getCookie(cookieName);
    if (inCart?.value) {
      const items: number = Number(inCart.value);
      const filterData = filterCookieData(inCart.name);
      if (filterData) {
        if (filterData.variant === selected) {
          await createCookie(cookieName, `${items + amount}`);

          //  !!AmountSelector omitted!!
          // await createCookie(cookieName, `${items + 1}`);
        }
      }
    } else {
      await createCookie(cookieName, `${amount}`);

      //  !!AmountSelector omitted!!
      // await createCookie(cookieName, `1`);
    }
  };

  return (
    <>
      <div className={styles.wrap}>
        <VariantSelector
          setState={setSelected}
          state={selected}
          variants={variantsArray}
        />
        <AmountSelector amount={stock} state={amount} setState={setAmount} />
        <button onClick={setCookie}>Add to Cart</button>
      </div>
    </>
  );
};

export default AddToCartBtn;
