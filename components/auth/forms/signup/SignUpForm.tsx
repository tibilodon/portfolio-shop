"use client";
import styles from "./signUpForm.module.css";
import { useState } from "react";
import { z } from "zod";
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "@/utils/actions";
const initialState = {
  message: "",
  field: "",
};

//  TODO: convert to formState and use schema in formAction

// const FormSchema = z
//   .object({
//     name: z
//       .string()
//       .min(2, "Name must be at least 2 characters long")
//       .max(45, "Name cannot exceed 45 characters")
//       .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),
//     email: z.string().email("Please enter a valid email address"),
//     phone: z.string().min(6, "Phone number is not valid"),
//     password: z
//       .string()
//       .min(6, "Password must be at least 6 characters")
//       .max(50, "Pw cannot exceed 50 chars"),
//     confirmPassword: z
//       .string()
//       .min(6, "Password must be at least 6 characters")
//       .max(50, "Pw cannot exceed 50 chars"),
//     accepted: z.literal(true, {
//       errorMap: () => ({
//         message: "please accept all terms",
//       }),
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "passwords do not match",
//     path: ["confirmPassword"],
//   });

type Props = {};

const SignUpForm = (props: Props) => {
  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <button type="submit" aria-disabled={pending}>
        submit
      </button>
    );
  }
  const [state, formAction] = useFormState(createUser, initialState);
  const [isVisiblePw, setIsVisiblePw] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsVisiblePw((prev) => !prev);
  };

  const [accepted, setAccepted] = useState();
  return (
    <form className={styles.wrap} action={formAction}>
      <label htmlFor="name">name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="email">email</label>
      <input type="email" id="email" name="email" />

      <label htmlFor="phone">phone</label>
      <input type="text" id="phone" name="phone" />

      <span>
        <label htmlFor="password">password</label>
        <input
          type={isVisiblePw ? "text" : "password"}
          id="password"
          name="password"
        />
        <button onClick={handleToggle}>see pw</button>
      </span>

      <label htmlFor="confirmPassword">confirmPassword</label>
      <input
        type={isVisiblePw ? "text" : "password"}
        id="confirmPassword"
        name="confirmPassword"
      />

      {/*TODO: is accepted => set state make button disabled until*/}
      <label htmlFor="terms">i accept terms</label>
      <input
        type="checkbox"
        id="terms"
        name="terms"
        onChange={() => setIsAccepted(!isAccepted)}
        value={isAccepted.toString()}
      />

      <SubmitButton />
    </form>
  );
};

export default SignUpForm;
