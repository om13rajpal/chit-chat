import { SendMailOptions } from "nodemailer";
import { EMAIL } from "../config/env.config";

export function mailOptions(to: string, username: string) {
  const options: SendMailOptions = {
    from: EMAIL,
    to,
    subject: "Welcome to chit-chat",
    text: `Hello ${username},\nWelcome to our platform. chat with encryption🔒\nTeam Chit-Chat aka Om`,
  };

  return options;
}
