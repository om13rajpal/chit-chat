import { transporter } from "../../config/mail.config";
import redis from "../../config/redis.config";
import { mailOptions } from "../../utils/mail.utils";

export async function sendOtp(email: string) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redis.set(`otp:${email}`, otp, "EX", 300);
  await transporter.sendMail(mailOptions(email, otp));
}

export async function verifyOtp(email: string, otp: string) {
  const sentOtp = await redis.get(`otp:${email}`);
  if (!sentOtp) return false;
  if (sentOtp !== otp) return false;

  await redis.del(`otp:${email}`);
  return true;
}
