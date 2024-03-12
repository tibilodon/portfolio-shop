"use client";
import { z } from "zod";
import { useState } from "react";
import { resetPassword } from "@/utils/actions";

type Props = { jwtUserId: string };

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, "min length is 6 chars")
      .max(52, "max length is 52 chars"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof formSchema>;

const ResetPassword: React.FunctionComponent<Props> = ({ jwtUserId }) => {
  const [isVisiblePw, setIsVisiblePw] = useState<boolean>(false);
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsVisiblePw((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //TODO:   show error msgs
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const validate = formSchema.safeParse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    if (validate.success) {
      try {
        const result = await resetPassword(jwtUserId, validate.data.password);
        if (result === "success") {
          //TODO: do something like redirect, show pw updated...
          console.log("password updated");
        }
      } catch (error) {
        console.log("error @ resetPassword form --handlesubmit");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default ResetPassword;
