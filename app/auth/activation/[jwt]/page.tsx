import { activateUser } from "@/utils/actions";

type Props = {
  params: {
    jwt: string;
  };
};

//TODO: set interval to navigate to profile
export default async function Activation({ params }: Props) {
  const result = await activateUser(params.jwt);
  return (
    <>
      <h1>activationm page</h1>
      {result === "userNotExist" ? (
        <p>user does not exists</p>
      ) : result === "alreadyActivated" ? (
        <p>user already activated</p>
      ) : result === "success" ? (
        <p>your account is now activated</p>
      ) : (
        <h2>something went wrong</h2>
      )}
    </>
  );
}
