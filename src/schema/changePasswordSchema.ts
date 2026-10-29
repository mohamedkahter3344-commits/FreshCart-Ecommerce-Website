import * as z from "zod";

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,
        "Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., @, #, or !).",
      ),
    currentPassword: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,
        "Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., @, #, or !).",
      ),
    rePassword: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,
        "Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., @, #, or !).",
      ),
  })
  .refine(
    (data) => {
      if (data.password === data.rePassword) {
        return true;
      }

      return false;
    },
    {
      error: "rePassword does not match Password",
      path: ["rePassword"],
    },
  );

export type changePasswordTypeSchema = z.infer<typeof changePasswordSchema>;
