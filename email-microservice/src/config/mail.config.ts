import { createTransport } from "nodemailer";
import { EMAIL, EMAIL_PASS } from "./env.config";

export const transporter = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_PASS,
  },
});
