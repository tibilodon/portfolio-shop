"use client";
import { forgotPassword } from "@/utils/actions";
import { z } from "zod";
const formSchema = z.object({
  email: z.string().email("please enter a valid email"),
});

type InputType = z.infer<typeof formSchema>;

type Props = {};

const ForgotPassword = (props: Props) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //TODO:   show error msgs
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const validate = formSchema.safeParse({
      email: email,
    });
    if (validate.success) {
      try {
        const result = await forgotPassword(validate.data.email);
        //TODO: is result.ok --> redirect to ???
      } catch (error) {
        console.log("error @ ForgotPassword form--> handleSubmit", error);
      }
      //   const res = await signIn("credentials", {
      //     redirect: false,
      //     username: validate.data.email,
      //   });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="name" />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default ForgotPassword;
