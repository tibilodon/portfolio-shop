"use client";
import { VariantType } from "@/components/cards/product/ProductCard";
import styles from "./variantSelector.module.css";
import { Dispatch, SetStateAction } from "react";
import { getCookie, createCookie, deleteCookie } from "@/utils/cookieActions";
import { filterCookieData } from "@/utils/helpers";

type Props = {
  state: VariantType;
  setState: Dispatch<SetStateAction<VariantType | null>>;
  variants: VariantType[];
};

const VariantSelector: React.FunctionComponent<Props> = ({
  variants,
  state,
  setState,
}) => {
  const handler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;

    //id needs to be reconverted to Number
    //find variant with the corresponding id and set state
    const findVariant = variants.find(
      (ids) => Number(ids.id) === Number(value)
    );
    setState(findVariant!!);
  };

  return (
    <>
      {state && (
        <div className={styles.wrap}>
          <label htmlFor="variant">select a variant:</label>
          <select
            required
            name="variant"
            id="variant"
            onChange={(e) => handler(e)}
          >
            {variants.map((item, i: number) => {
              return (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </>
  );
};

export default VariantSelector;
