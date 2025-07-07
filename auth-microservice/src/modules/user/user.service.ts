import prisma from "../../config/prisma.config";
import { comparePassword } from "../../utils/password.utils";

export async function registerUser(payload: any) {
  const user = await prisma.user.create({
    data: payload,
  });

  return user;
}

export async function loginUser(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) return null;
  const isCorrectPassword = await comparePassword(password, user.password);
  if (!isCorrectPassword) return null;

  return user;
}

export async function getUsers(id: number) {
  const users = await prisma.user.findMany({
    where: {
      id: {
        not: id,
      },
    },
  });

  return users;
}
