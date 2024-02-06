import styles from "./variantSelector.module.css";
import { Dispatch, SetStateAction } from "react";
type Props = {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  variants: string[];
};

const VariantSelector: React.FunctionComponent<Props> = ({
  variants,
  state,
  setState,
}) => {
  return (
    <>
      <div className={styles.wrap}>
        <select
          required
          value={state}
          onChange={(e) => setState(e.currentTarget.value)}
        >
          {variants &&
            variants.map((item: any, i: number) => {
              return (
                <option key={i} value={item}>
                  {item}
                </option>
              );
            })}
        </select>
      </div>
    </>
  );
};

export default VariantSelector;
