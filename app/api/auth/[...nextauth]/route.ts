import prisma from "@/prisma/prismaClient";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { User } from "@prisma/client";

export const OPTIONS: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        //  as email
        username: {
          label: "User name",
          type: "text",
          placeholder: "Your user name",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        //  checks for credentials
        if (!user) {
          throw new Error("user or pw is incorrect");
        }
        //  without hashing  const isPasswordCorrect = credentials?.password === user.password;

        //  no pw
        if (!credentials?.password) {
          throw new Error("pls provide y password");
        }
        //  check hashed pw
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        //  pw do not match
        if (!isPasswordCorrect) {
          throw new Error("user or pw is incorrect");
        }
        //  pw match => return user obj without PW
        const { password, ...userWithoutPass } = user;
        return userWithoutPass;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User;
      }
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(OPTIONS);
export { handler as GET, handler as POST };
