//must remain a server component
import styles from "./cartIcon.module.css";
import { getCookie, getAllCookies } from "@/utils/cookieActions";
import { filterCookieData } from "@/utils/helpers";

type Props = {};

const CartItems: React.FunctionComponent<Props> = async () => {
  let addedToCart: number = 0;
  const data = await getAllCookies();

  if (data) {
    for (let index = 0; index < data.length; index++) {
      const obj = data[index];
      if (obj.name !== "tnc") {
        // const filteredData = filterCookieData(obj.value);

        // if (filteredData) {
        addedToCart = addedToCart + Number(obj.value);
        // } else return;
      }
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
