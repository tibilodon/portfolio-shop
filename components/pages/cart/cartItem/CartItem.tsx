"use client";

import styles from "./cartItem.module.css";
import { filterCookieData, findKey } from "@/utils/helpers";
import Images from "@/components/images/Images";

type Props = {
  product: string;
  value: string;
  //TODO:
  prismaData: any;
};
const CartItem: React.FunctionComponent<Props> = ({
  product,
  value,
  prismaData,
}) => {
  const productAndVariant = filterCookieData(product);

  //TODO: create async helper?
  const testFind = prismaData.find(
    (item: any) => item.name === productAndVariant?.product
  );
  return (
    <>
      {/*use less expensive values wherever is possible - cookie values are string type*/}
      {productAndVariant && (
        <div className={styles.wrap}>
          <h5>product: {productAndVariant?.product}</h5>

          {productAndVariant.variant !== "null" && (
            <h5>variant: {productAndVariant.variant}</h5>
          )}
          <h5>amount selected: {value}</h5>
          {/*TODO: extract price accordingly - check if variant selected*/}
          <h5> price: {testFind.price}</h5>
          <Images alt={productAndVariant?.product} image={testFind.imageUrl} />
        </div>
      )}
    </>
  );
};

export default CartItem;
