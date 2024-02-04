"use client";
import styles from "./addBtn.module.css";
import { getCookie, createCookie, deleteCookie } from "@/utils/cookieActions";

type Props = { id: string };

const AddBtn: React.FunctionComponent<Props> = ({ id }) => {
  const setCookie = async () => {
    const inCart = await getCookie(id);
    if (inCart?.value) {
      const items: number = Number(inCart.value);
      await createCookie(id, `${items + 1}`);
    } else {
      await createCookie(id, `1`);
    }
  };

  return (
    <>
      <div className={styles.wrap} onClick={setCookie}>
        Add to Cart
      </div>
    </>
  );
};

export default AddBtn;
