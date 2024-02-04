"use client";
import styles from "./cartItem.module.css";

import { deleteCookie } from "@/utils/cookieActions";
import { useRouter } from "next/navigation";

type Props = {
  product: string;
  value: string;
};
const CartItem: React.FunctionComponent<Props> = ({ product, value }) => {
  const router = useRouter();
  const test = () => {
    deleteCookie(product);
    router.refresh();
  };

  return (
    <>
      <div className={styles.wrap}>
        <h5>{product}</h5>
        <h5>{value}</h5>
        <button onClick={test}>test delete</button>
      </div>
      {/* {title ? (
        <>
          <h1>
            {data.map((items, i: number) => {
              return (
                <div key={i}>
                  <h5>product name: {items.name}</h5>
                  <h5>value: {items.value}</h5>
                </div>
              );
            })}
          </h1>
        </>
      ) : (
        <div className={styles.wrap}>
          <Image
            className={styles.icon}
            src={icon}
            height={80}
            width={80}
            alt="empty black and white target icon"
          />
          <h1>A kosár üres</h1>
        </div>
      )} */}
    </>
  );
};

export default CartItem;
