import prisma from "../../config/prisma.config";
import { comparePassword } from "../../utils/password.utils";

export async function registerUser(payload: any) {
  const merchant = await prisma.user.create({
    data: payload,
  });

  return merchant;
}

export async function loginUser(username: string, password: string) {
  const merchant = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!merchant) return false;
  const isCorrectPassword = await comparePassword(password, merchant.password);
  if (!isCorrectPassword) return false;

  return true;
}
