"use client";
import styles from "./cartItem.module.css";

// import { deleteCookie } from "@/utils/cookieActions";
import { filterCookieData, findKey } from "@/utils/helpers";
// import { useRouter } from "next/navigation";
import data from "@/utils/dataset.json";
import Images from "@/components/images/Images";

type Props = {
  product: string;
  value: string;
};
const CartItem: React.FunctionComponent<Props> = ({ product, value }) => {
  // const router = useRouter();
  // const test = () => {
  //   deleteCookie(product);
  //   router.refresh();
  // };
  const productAndVariant = filterCookieData(product);
  const findProduct = findKey(data, productAndVariant!!.product);
  return (
    <>
      {findProduct && productAndVariant && (
        <div className={styles.wrap}>
          <h5>product: {productAndVariant?.product}</h5>
          <h5>variant: {productAndVariant?.variant}</h5>
          <h5>amount: {value}</h5>
          <Images alt={productAndVariant?.product} image={findProduct.image} />
          {/* <button onClick={test}>test delete</button> */}
        </div>
      )}
    </>
  );
};

export default CartItem;
