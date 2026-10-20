import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("inValid Email"),
  password: z
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,
      "Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., @, #, or !).",
    ),
});

export type LoginTypeSchema = z.infer<typeof loginSchema>;
