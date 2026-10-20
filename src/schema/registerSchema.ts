import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string().trim()
      .min(4, "min Length 4 characters")
      .max(20, "max Length 20 characrters"),
    email: z.email("inValid Email"),
    password: z
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
    phone: z.string().regex(/^01[0125][0-9]{8}$/, {
      message:
        "Please enter a valid Egyptian mobile number (e.g., 01012345678).",
    }),
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

export type RegisterTypeSchema = z.infer<typeof registerSchema>;
