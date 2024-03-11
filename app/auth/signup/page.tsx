import SignInButton from "@/components/auth/buttons/SignInButton";
import SignUpForm from "@/components/auth/forms/signup/SignUpForm";
import Link from "next/link";
export default async function Login() {
  return (
    <>
      <h1>loginPage</h1>
      <h5>already a member?</h5>
      <SignInButton />
      <SignUpForm />
    </>
  );
}
