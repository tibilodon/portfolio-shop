import styles from "./cartItem.module.css";
import icon from "@/public/icons/empty_target.svg";
import Image from "next/image";

type Props = {
  testData?: string;
};

const CartItem: React.FunctionComponent<Props> = ({ testData }) => {
  return (
    <>
      {testData ? (
        <>{testData}</>
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
      )}
    </>
  );
};

export default CartItem;
