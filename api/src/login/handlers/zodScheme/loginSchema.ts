import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);
const emailSchema = z.string().email().min(15);
const passwordSchema = z.string().regex(passwordRegex);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
