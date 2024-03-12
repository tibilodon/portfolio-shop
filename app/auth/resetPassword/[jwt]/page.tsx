import ResetPassword from "@/components/auth/forms/resetPassword/ResetPassword";
import { verifyJwt } from "@/utils/jwt";

type Props = {
  params: {
    jwt: string;
  };
};

export default async function ResetPasswordPage({ params }: Props) {
  const payload = verifyJwt(params.jwt);
  if (!payload) {
    return (
      <>
        <h1>THE URL IS NOT VALID</h1>
      </>
    );
  }
  return (
    <>
      <ResetPassword jwtUserId={params.jwt} />
    </>
  );
}
