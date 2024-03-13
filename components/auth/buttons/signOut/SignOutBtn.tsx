"use client";
import { signOut } from "next-auth/react";
type Props = {};

const SignOutBtn = (props: Props) => {
  return <button onClick={() => signOut()}>sign out</button>;
};

export default SignOutBtn;
