import styles from "./amountSelector.module.css";
import { Dispatch, SetStateAction } from "react";

type Props = {
  state: number;
  setState: Dispatch<SetStateAction<number>>;
  selected: number;
};

const AmountSelector: React.FunctionComponent<Props> = ({
  state,
  setState,
  selected,
}) => {
  return (
    <>
      <div className={styles.wrap}>
        <select
          required
          value={state}
          onChange={(e) => setState(Number(e.currentTarget.value))}
        >
          {Array.from({ length: Number(selected) }, (_, i) => i + 1).map(
            (item, i) => {
              return (
                <option key={i} value={item}>
                  {item}
                </option>
              );
            }
          )}
        </select>
      </div>
    </>
  );
};

export default AmountSelector;
