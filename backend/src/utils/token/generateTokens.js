import { userRoles } from "../../DB/models/user.model.js";
import { generateToken } from "./generateToken.js";

export const generateTokens = async (user) => {
  const payload = { id: user._id, email: user.email };

  const accessTokenSignature =
    user.role === userRoles.CANDIDATE
      ? process.env.ACCESS_TOKEN_USER
      : process.env.ACCESS_TOKEN_ADMIN;

  const refreshTokenSignature =
    user.role === userRoles.CANDIDATE
      ? process.env.REFRESH_TOKEN_USER
      : process.env.REFRESH_TOKEN_ADMIN;

  const access_token = await generateToken({
    payload,
    signature: accessTokenSignature,
    options: { expiresIn: "1h" },
  });

  const refresh_token = await generateToken({
    payload,
    signature: refreshTokenSignature,
    options: { expiresIn: "1y" },
  });

  return { access_token, refresh_token };
};
