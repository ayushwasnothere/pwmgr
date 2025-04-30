import { z } from "zod";

export const signinSchema = z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(8).max(155),
});

export const signupSchema = z.object({}).merge(signinSchema);
