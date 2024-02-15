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
    const { id } = e.currentTarget;
    console.log("the id:", id);
    //id needs to be reconverted to Number
    //find variant with the corresponding id and set state
    const findVariant = variants.find((ids) => Number(ids.id) === Number(id));
    console.log("thee variant", findVariant);
    setState(findVariant!!);
  };

  return (
    <>
      {state && (
        <div className={styles.wrap}>
          <select
            required
            id={String(state.id)}
            value={state.name}
            onChange={(e) => handler(e)}
          >
            {variants.map((item, i: number) => {
              return (
                <option key={i} id={String(item.id)} value={item.name}>
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
