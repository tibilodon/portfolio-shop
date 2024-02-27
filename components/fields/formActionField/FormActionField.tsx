"use client";
import styles from "./formActionField.module.css";
type Props = {
  label: string;
  defaultValue: string | number | readonly string[];
  type: React.HTMLInputTypeAttribute;
  id: string;

  required: boolean;
};

const FormActionField: React.FunctionComponent<Props> = ({
  label,
  defaultValue,
  type,
  id,
  required,
}) => {
  return (
    <>
      <span>
        <label htmlFor={id}>{label}</label>
        <input
          //uncontrolled component
          defaultValue={defaultValue}
          type={type}
          id={id}
          name={id}
          required={required}
        />
      </span>
    </>
  );
};

export default FormActionField;
