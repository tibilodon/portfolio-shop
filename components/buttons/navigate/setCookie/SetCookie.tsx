"use client";
import { createCookie } from "@/utils/cookieActions";

type Props = {};

const SetCookie: React.FunctionComponent<Props> = () => {
  const setTnc = async () => {
    await createCookie("tnc", "1");
  };
  return (
    <>
      <button onClick={setTnc}>set tnc</button>
    </>
  );
};

export default SetCookie;
