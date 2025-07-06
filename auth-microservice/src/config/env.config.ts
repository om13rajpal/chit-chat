import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname, "../../.env");
dotenv.config({
  path: envPath,
});

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV
export const REDIS_URL = process.env.REDIS_URL
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_ISSUER = process.env.JWT_ISSUER
export const EMAIL = process.env.EMAIL
export const EMAIL_PASS = process.env.EMAIL_PASS