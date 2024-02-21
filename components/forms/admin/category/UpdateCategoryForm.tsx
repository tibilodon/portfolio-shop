"use client";
import TestButton from "@/components/test/TestButton";
import styles from "./categoryForm.module.css";
import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateCategory } from "@/utils/categoryActions";
import { usePathname } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      done
    </button>
  );
}

type Props = { id: number; name: string };

const UpdateCategoryForm: React.FunctionComponent<Props> = ({ id, name }) => {
  const pathname = usePathname();
  const initialState = {
    message: "",
    pathname: pathname,
    id: id,
  };
  const [show, setShow] = useState(false);
  const [state, formAction] = useFormState(updateCategory, initialState);

  useEffect(() => {
    if (!state.message.includes("error")) {
      setShow(false);
    }
  }, [state]);

  return (
    <>
      <div className={styles.wrap}>
        {show ? (
          <>
            <form action={formAction}>
              <label htmlFor="category">
                <input type="text" id="category" name="category" required />
              </label>
              <SubmitButton />
            </form>
          </>
        ) : (
          <button onClick={() => setShow(!show)}>edit</button>
        )}
        <p aria-live="polite" role="status">
          {state?.message}
        </p>
      </div>
    </>
  );
};

export default UpdateCategoryForm;
