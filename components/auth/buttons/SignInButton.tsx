"use client";
import styles from "./signInButton.module.css";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

type Props = {};

const SignInButton = (props: Props) => {
  const { data: session } = useSession();
  return (
    <>
      <div className={styles.wrap}>
        {session && session.user ? (
          <>
            <Link href={"/auth/profile"}>
              <h3>name:</h3>
              <p>{session?.user?.name}</p>
            </Link>
            <Link href={"/api/auth/signout"}>sign out</Link>
          </>
        ) : (
          <>
            {/*--API route--*/}
            {/* <Link href={"/api/auth/signin"}>sign in</Link> */}
            {/*directs to the signIn page declared in the route.ts*/}
            <button onClick={() => signIn()}></button>

            {/*--page--*/}
            <Link href={"/auth/signup"}>sign UP</Link>
          </>
        )}
      </div>
    </>
  );
};

export default SignInButton;
