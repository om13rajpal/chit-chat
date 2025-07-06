import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname, "../../.env");
dotenv.config({
  path: envPath,
});

export const PORT = process.env.PORT;
export const EMAIL = process.env.EMAIL;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const REDIS_URL = process.env.REDIS_URL;
export const NODE_ENV = process.env.NODE_ENV
