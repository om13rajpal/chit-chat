import bcrypt, { hash } from "bcrypt";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  return hashedPass;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword);
}
