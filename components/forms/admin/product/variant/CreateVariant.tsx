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
                <label htmlFor={`var__${item}__name`}>
                  variant {item} name
                </label>
                <input
                  type="text"
                  id={`var__${item}__name`}
                  name={`var__${item}__name`}
                  required
                />
                <label htmlFor={`var__${item}__price`}>
                  variant {item} price
                </label>
                <input
                  type="number"
                  id={`var__${item}__price`}
                  name={`var__${item}__price`}
                  required
                />
                <label htmlFor={`var__${item}__stock`}>
                  variant {item} stock
                </label>
                <input
                  type="number"
                  id={`var__${item}__stock`}
                  name={`var__${item}__stock`}
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
