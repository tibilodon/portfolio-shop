import styles from "./emptyCart.module.css";
import Image from "next/image";
import icon from "@/public/icons/empty_target.svg";

type Props = {};

const EmptyCart: React.FunctionComponent<Props> = (props: Props) => {
  return (
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
  );
};

export default EmptyCart;
