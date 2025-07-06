import { JWT_ISSUER, JWT_SECRET } from "../config/env.config";
import jwt from "jsonwebtoken";

export function generateLoginToken(username: string) {
  const payload = {
    username,
    iss: JWT_ISSUER,
    jti: `${username}xyz${new Date()}`,
  };

  return jwt.sign(payload, JWT_SECRET!, {
    expiresIn: "1h",
  });
}