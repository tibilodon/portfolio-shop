import styles from "./formFields.module.css";
import { ValidatedType } from "@/utils/helpers";
import { useState, useEffect } from "react";

type Props = {
  type: string;
  id: string;
  name: string;
  validated: ValidatedType[];
  pattern?: string;
  maxLength?: number;
};

const FormFields: React.FunctionComponent<Props> = ({
  type,
  id,
  name,
  validated,
  pattern,
  maxLength,
}) => {
  const [errorMsg, setErrorMsg] = useState(false);

  //   const handler = (e: React.FormEvent<HTMLInputElement>) => {
  //     const { value } = e.currentTarget;
  //     const killme = String(value);
  //     if (value.length > 4) {
  //       console.log("length:", value.length);
  //       return;
  //     }
  //   };

  //    set invalid class
  useEffect(() => {
    const setIfUnvalid = () => {
      const hasNameId = validated.some((obj) => obj.id === id);
      if (hasNameId) {
        setErrorMsg(true);
      } else {
        setErrorMsg(false);
      }
    };
    setIfUnvalid();
  }, [validated, id]);

  return (
    <>
      <div className={styles.wrap}>
        <label htmlFor={id}>{name}</label>
        <input
          className={errorMsg ? styles.invalid : ""}
          type={type}
          id={id}
          name={name}
          required
          pattern={pattern}
          maxLength={maxLength}
        />
        {validated.map(
          (items, i) =>
            items.id === id && (
              <p key={i} aria-live="polite" role="status">
                {items.message}
              </p>
            )
        )}
      </div>
    </>
  );
};

export default FormFields;
