import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import SignInButton from "@/components/auth/buttons/SignInButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

//  keeping it server
type UserType = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  email: string;
  emailVerified: Date | null;
  password: string;
  name: string;
  phone: string;
  role: string;
};

export default async function Profile() {
  const session = await getServerSession(OPTIONS);
  const user = session?.user;

  //  protect routes - manually
  // if (!session || !session.user) {
  //   redirect("/auth/signin");
  // }
  //  TODO: add log out and delete profile
  return (
    <>
      <h1>profile page</h1>
      <h4>name: {user?.name}</h4>
      <h4>phone: {user?.phone}</h4>
      <h4>email: {user?.email}</h4>

      {/* <SignInButton /> */}
    </>
  );
}
