"use client";
import styles from "./createVariant.module.css";
import { useState } from "react";
type Props = {};

const CreateVariant: React.FunctionComponent<Props> = (props: Props) => {
  const [showInput, setShowInput] = useState(false);
  const [variantId, setVariantId] = useState<number>(0);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    !showInput && setShowInput(true);
    setVariantId((prevCount) => prevCount + 1);
  };
  // name, price, stock
  return (
    <>
      <div>
        <button onClick={(e) => handleButtonClick(e)}>Add variant</button>
        {showInput &&
          Array.from({ length: variantId }, (_, i) => i + 1).map((item, i) => {
            return (
              <span className={styles.wrap} key={i}>
                <label htmlFor={`var__name__${item}`}>
                  variant {item} name
                </label>
                <input
                  type="text"
                  id={`var__name__${item}`}
                  name={`var__name__${item}`}
                  required
                />
                <label htmlFor={`var__price__${item}`}>
                  variant {item} price
                </label>
                <input
                  type="number"
                  id={`var__price__${item}`}
                  name={`var__price__${item}`}
                  required
                />
                <label htmlFor={`var__stock__${item}`}>
                  variant {item} stock
                </label>
                <input
                  type="number"
                  id={`var__stock__${item}`}
                  name={`var__stock__${item}`}
                  required
                />
              </span>
            );
          })}
      </div>
    </>
  );
};

export default CreateVariant;
