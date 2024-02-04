//must remain a server component
import styles from "./cartIcon.module.css";
import { getCookie, getAllCookies } from "@/utils/cookieActions";

type Props = {};

const CartItems: React.FunctionComponent<Props> = async () => {
  let addedToCart: number = 0;
  const data = await getAllCookies();
  if (data) {
    for (let index = 0; index < data.length; index++) {
      const obj = data[index];
      addedToCart = addedToCart + Number(obj.value);
    }
  }

  return (
    <>
      {addedToCart > 0 ? (
        <div className={styles.cartItemsWrap}>
          <span>{addedToCart}</span>
        </div>
      ) : null}
    </>
  );
};

export default CartItems;
