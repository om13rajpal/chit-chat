import { SendMailOptions } from "nodemailer";
import { EMAIL } from "../config/env.config";

export function mailOptions(to: string, otp: string) {
  const options: SendMailOptions = {
    from: EMAIL,
    to,
    subject: "Verify your OTP",
    text: `your otp is ${otp}`,
  };

  return options;
}
