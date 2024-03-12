//  signing a jwt

type SignOption = {
  expiresIn: string | number;
};

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1d",
};

import jwt, { JwtPayload } from "jsonwebtoken";

export function signJwt(
  payload: jwt.JwtPayload,
  option: SignOption = DEFAULT_SIGN_OPTION
) {
  const secretKey = process.env.JWT_USER_ID_SECRET!;
  const token = jwt.sign(payload, secretKey);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secretKey = process.env.JWT_USER_ID_SECRET!;
    const decoded = jwt.verify(token, secretKey);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
