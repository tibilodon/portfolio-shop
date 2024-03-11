"use client";
import styles from "./signInForm.module.css";
import { z } from "zod";
import { useFormState, useFormStatus } from "react-dom";
import { signInUser } from "@/utils/actions";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const initialState = {
  message: "",
  field: "",
};

type Props = {
  callbackUrl?: string;
};

//  frontend validation
const ZSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof ZSchema>;

// function SubmitButton() {
//     const handleSubmit
//   const { pending } = useFormStatus();

//   return (
//     <button type="submit" aria-disabled={pending}>
//       login
//     </button>
//   );
// }

//  --client side sign in--
const SignInForm: React.FunctionComponent<Props> = ({ callbackUrl }) => {
  const router = useRouter();
  const [state, formAction] = useFormState(signInUser, initialState);
  const [isVisiblePw, setIsVisiblePw] = useState<boolean>(false);
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsVisiblePw((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //TODO:   show error msgs
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const validate = ZSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (validate.success) {
      const res = await signIn("credentials", {
        redirect: false,
        username: validate.data.email,
        password: validate.data.password,
      });
      if (!res?.ok) {
        console.log("error from @signInUser", res?.error);
        return {
          message: "error @ signInUser action",
          field: "na",
        };
      }
      router.push(callbackUrl ? callbackUrl : "/auth/profile");
    }
  };

  return (
    <>
      <div className={styles.wrap}>
        <h1>sign in form</h1>
        <form
          className={styles.wrap}
          onSubmit={handleSubmit}
          // action={formAction}
        >
          <label htmlFor="email">email</label>
          <input type="email" id="email" name="email" />

          <span>
            <label htmlFor="password">password</label>
            <input
              type={isVisiblePw ? "text" : "password"}
              id="password"
              name="password"
            />
            <button onClick={handleToggle}>see pw</button>
          </span>

          {/* <SubmitButton /> */}
          <button type="submit">sign in</button>
        </form>

        <Link href={"/auth/signup"}>sign up instead</Link>
      </div>
    </>
  );
};

export default SignInForm;
