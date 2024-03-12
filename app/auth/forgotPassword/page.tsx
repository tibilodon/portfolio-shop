// import { z } from "zod";
// const formSchema = z.object({
//   email: z.string().email("please enter a valid email"),
// });

// type InputType = z.infer<typeof formSchema>;

// //  TODO: keep it as server comp

// export default async function ForgotPassword() {
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     //TODO:   show error msgs
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const validate = formSchema.safeParse({
//       email: formData.get("email"),
//     });
//     // if (validate.success) {
//     //   const res = await signIn("credentials", {
//     //     redirect: false,
//     //     username: validate.data.email,
//     //   });
//     //   if (!res?.ok) {
//     //     console.log("error from @signInUser", res?.error);
//     //     return {
//     //       message: "error @ signInUser action",
//     //       field: "na",
//     //     };
//     //   }
//     //   router.push(callbackUrl ? callbackUrl : "/auth/profile");
//     // }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="email"></label>
//         <input type="email" name="email" id="name" />
//         <button type="submit">submit</button>
//       </form>
//     </>
//   );
// }

import ForgotPassword from "@/components/auth/forms/forgotPassword/ForgotPassword";

export default async function ForgotPasswordPage() {
  return (
    <>
      <ForgotPassword />
    </>
  );
}
