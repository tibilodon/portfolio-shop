import SignInButton from "@/components/auth/buttons/SignInButton";
import SignInForm from "@/components/auth/forms/signIn/SignInForm";
import Link from "next/link";

type Props = {
  searchParams: {
    callbackUrl?: string;
  };
};

export default async function SignIn({ searchParams }: Props) {
  return (
    <>
      <h1>sign in PAGE</h1>
      {/* <SignInButton /> */}
      <span>
        <SignInForm callbackUrl={searchParams.callbackUrl} />
        <Link href={"/auth/forgotPass"}>Forgot your pass?</Link>{" "}
      </span>
    </>
  );
}
