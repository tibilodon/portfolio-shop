"use client";
import styles from "./addBtn.module.css";
import { getCookie, createCookie, deleteCookie } from "@/utils/cookieActions";

type Props = { id: number };

const AddBtn: React.FunctionComponent<Props> = ({ id }) => {
  const setCookie = async () => {
    const inCart = await getCookie(`${id}`);
    if (inCart?.value) {
      const items: number = Number(inCart.value);
      // console.log("exists", items + 1);
      await createCookie(`${id}`, `${items + 1}`);
    } else {
      await createCookie(`${id}`, `1`);
    }
    // if (inCart?.value) {
    //add +1 to the existing value of the SPECIFIC cookie related to the id|product
    // const regexReplaceValue = /.*?__/;
    // let regexExtractOrder = /^(.*?)__/;
    // const cartValue = inCart.value.replace(regexReplaceValue, "");

    //[0] full value
    //[1] item id
    //[3] current items in cart
    // const values = /^(.*?)(__)(.*)$/.exec(inCart.value);

    //item ids
    const ids = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    // const kek = [];
    // for (let index = 0; index < ids.length; index++) {
    //   const element = ids[index];
    //   const res = await getCookie(element.toString());
    //   // console.log(res);
    //   if (res?.value) {
    //     let obj = {
    //       id: res.name,
    //       val: res.value,
    //     };
    //     kek.push(obj);
    //   }
    // }
    // console.log("try me", kek);

    // }
    // else {
    //   //create the cookie
    //   console.log("no items in cart");
    //   await createCookie(`${id}`, `1`);
    //   await createCookie(`2`, `2`);
    //   await createCookie(`3`, `3`);
    // }
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
