import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("Valid email is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Minimum 6 characters are required").max(30),
});
