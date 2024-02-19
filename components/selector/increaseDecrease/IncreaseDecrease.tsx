"use client";
import { createCookie } from "@/utils/cookieActions";
import styles from "./increaseDecrease.module.css";
import { useState } from "react";

type Props = {
  currentAmount: number;
  stock: number;
  cookieName: string;
};

const IncreaseDecrease: React.FunctionComponent<Props> = ({
  currentAmount,
  stock,
  cookieName,
}) => {
  //  can add or remove items, max value is stock
  const [selected, setSelected] = useState<number>(currentAmount);

  //  disabled states
  const [decreaseDisabled, setDecreaseDisabled] = useState<boolean>(
    currentAmount === 1 ? true : false
  );
  const [increaseDisabled, setIncreaseDisabled] = useState<boolean>(
    stock === currentAmount ? true : false
  );

  //  onclick & disabled handlers
  const decreaseHandler = async () => {
    const value = selected;
    if (selected - 1 === 1) {
      await createCookie(cookieName, `${value - 1}`);
      setSelected(selected - 1);
      setDecreaseDisabled(true);
      setIncreaseDisabled(false);
    } else {
      setDecreaseDisabled(false);
      setIncreaseDisabled(false);
      setSelected(selected - 1);
      await createCookie(cookieName, `${value - 1}`);
    }
  };

  const increaseHandler = async () => {
    const value = selected;

    //handle stock capacity
    if (selected + 1 === stock) {
      await createCookie(cookieName, `${value + 1}`);
      setDecreaseDisabled(false);
      setIncreaseDisabled(true);
      setSelected(selected + 1);
    } else {
      await createCookie(cookieName, `${value + 1}`);
      setIncreaseDisabled(false);
      setDecreaseDisabled(false);
      setSelected(selected + 1);
    }
  };

  return (
    <>
      <div className={styles.wrap}>
        <button disabled={decreaseDisabled} onClick={decreaseHandler}>
          <strong>-</strong>
        </button>
        {selected}
        <button disabled={increaseDisabled} onClick={increaseHandler}>
          <strong>+</strong>
        </button>
      </div>
    </>
  );
};

export default IncreaseDecrease;
