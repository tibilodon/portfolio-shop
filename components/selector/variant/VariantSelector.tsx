import { VariantType } from "@/components/cards/product/ProductCard";
import styles from "./variantSelector.module.css";
import { Dispatch, SetStateAction } from "react";
import { getCookie, createCookie, deleteCookie } from "@/utils/cookieActions";
import { filterCookieData } from "@/utils/helpers";

type Props = {
  state: VariantType;
  setState: Dispatch<SetStateAction<VariantType>>;
  variants: VariantType[];
};

const VariantSelector: React.FunctionComponent<Props> = ({
  variants,
  state,
  setState,
}) => {
  const handler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id } = e.currentTarget;
    //id needs to be reconverted to Number
    //find variant with the corresponding id and set state
    const findVariant = variants.find((ids) => ids.id === Number(id));
    console.log("thee variant", findVariant);
    setState(findVariant!!);
  };

  return (
    <>
      <div className={styles.wrap}>
        <select required value={state.name} onChange={(e) => handler(e)}>
          {variants.map((item, i: number) => {
            return (
              <option key={i} id={String(item.id)} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default VariantSelector;
