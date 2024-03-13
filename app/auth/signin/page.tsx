import SignInButton from "@/components/auth/buttons/SignInButton";
import SignInForm from "@/components/auth/forms/signIn/SignInForm";
import Link from "next/link";

type Props = {
  searchParams: {
    callbackUrl?: string;
    message?: string;
  };
};

export default async function SignIn({ searchParams }: Props) {
  // console.log("searchparams", searchParams.message);
  return (
    <>
      <h1>sign in PAGE</h1>
      {searchParams.message && <h1>{searchParams.message}</h1>}
      {/* <SignInButton /> */}
      <span>
        <SignInForm callbackUrl={searchParams.callbackUrl} />
        <Link href={"/auth/forgotPassword"}>Forgot your pass?</Link>{" "}
      </span>
    </>
  );
}
