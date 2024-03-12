"use server";
import { z } from "zod";
import prisma from "@/prisma/prismaClient";
import * as bcrypt from "bcrypt";
import { sendVerificationEmail } from "../sendEmail";
import { verifyTemplate } from "../emailTemplate/activation";
import { signJwt, verifyJwt } from "../jwt";
import { forgotPassTemplate } from "../emailTemplate/forgotPass";
// import { signIn } from "next-auth/react";

export type ErrorType = {
  message: string;
  field: string;
};

//TODO: add error msg and whatnot later
export async function createUser(prevState: ErrorType, formData: FormData) {
  //  zod schema
  const zSchema = z
    .object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(45, "Name cannot exceed 45 characters"),
      // .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),
      email: z.string().email("Please enter a valid email address"),
      phone: z.string().min(6, "Phone number is not valid"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Pw cannot exceed 50 chars"),
      confirmPassword: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Pw cannot exceed 50 chars"),
      // terms: z.boolean({
      //   required_error: "isActive is required",
      //   invalid_type_error: "isActive must be a boolean",
      // }),
      accepted: z.literal("true", {
        errorMap: () => ({
          message: "please accept all terms",
        }),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "passwords do not match",
      path: ["confirmPassword"],
    });
  //   console.log(formData.get("terms"));

  //   const formDataKeys = [
  //     "name",
  //     "email",
  //     "phone",
  //     "password",
  //     "confirmPassword",
  //     "terms",
  //   ];
  //   const formDataObject = Array.from(formData.keys()).reduce((acc: any, key) => {
  //     if (formDataKeys.includes(key)) {
  //       acc[key] = formData.get(key);
  //     }
  //     return acc;
  //   }, {});

  const parse = zSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    accepted: formData.get("terms"),
  });

  //   const parse = zSchema.safeParse(formDataObject);

  if (!parse.success) {
    console.log("parsed", parse.error);
    return {
      message: "",
      field: "",
    };
  }
  const data = parse.data;
  console.log("data is fine", data);
  const registerUser = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      phone: data.phone,

      password: await bcrypt.hash(data.password, 10),
    },
  });
  if (registerUser) {
    console.log("user registered:", registerUser);
  }

  //  jwt
  const jwtUserId = signJwt({
    id: registerUser.id,
  });

  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
  await sendVerificationEmail({
    to: registerUser.email,
    subject: "please verify email",
    body: verifyTemplate(registerUser.name, activationUrl),
  });

  //  TODO: EXTRACT NAME FOR EMAIL TEMPLATE

  return {
    message: "",
    field: "",
  };
}

// export async function signInUser(prevState: ErrorType, formData: FormData) {
//   //   const res = await signIn("credentials", {
//   //     redirect: false,
//   //     username: formData.get("name"),
//   //     password: formData.get("password"),
//   //   });
//   //   if (!res?.ok) {
//   //     console.log("error from @signInUser", res?.error);
//   //     return {
//   //       message: "error @ signInUser action",
//   //       field: "na",
//   //     };
//   //   }
//   return {
//     message: "",
//     field: "",
//   };
// }

type ActivateUserFunc = (
  jwtUserId: string
) => Promise<"userNotExist" | "alreadyActivated" | "success">;

export const activateUser: ActivateUserFunc = async (jwtUserId) => {
  const payload = verifyJwt(jwtUserId);
  const userId = payload?.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return "userNotExist";
  }
  if (user.emailVerified) {
    return "alreadyActivated";
  }

  //  otherwise
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: new Date(),
    },
  });
  return "success";
};

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("the user does not exist");
  }
  const jwtUserId = signJwt({
    id: user.id,
  });
  const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/resetPassword/${jwtUserId}`;
  const result = await sendVerificationEmail({
    to: user.email,
    subject: "please verify email",
    body: forgotPassTemplate(user.name, resetPassUrl),
  });
  return result;
}

type ResetPasswordFunc = (
  jwtUserId: string,
  password: string
) => Promise<"userNotExist" | "success">;

export const resetPassword: ResetPasswordFunc = async (jwtUserId, password) => {
  const payload = verifyJwt(jwtUserId);
  if (!payload) {
    return "userNotExist";
  }
  const userId = payload.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return "userNotExist";
  }
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: await bcrypt.hash(password, 10),
    },
  });
  if (result) {
    return "success";
  } else {
    throw new Error("error @ resetPassword--server action");
  }
};
