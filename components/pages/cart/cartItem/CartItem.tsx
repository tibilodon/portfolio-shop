"use client";

import styles from "./cartItem.module.css";
import Images from "@/components/images/Images";

type Props = {
  name: string;
  basePrice: number;
  selectedAmount: number;
  variants: any;
  imageUrl: string;
};
const CartItem: React.FunctionComponent<Props> = ({
  name,
  basePrice,
  selectedAmount,
  variants,
  imageUrl,
}) => {
  return (
    <>
      <div className={styles.wrap}>
        <h5>product: {name}</h5>

        {variants && (
          <>
            <h5>variant: {variants.name}</h5>
            <h5>price: {Number(variants.price) * selectedAmount}</h5>
          </>
        )}
        {!variants && <h5>price: {Number(basePrice) * selectedAmount}</h5>}
        <h5>amount selected: {selectedAmount}</h5>

        <Images alt={`image of ${name}`} image={imageUrl} />
      </div>
    </>
  );
};

export default CartItem;
