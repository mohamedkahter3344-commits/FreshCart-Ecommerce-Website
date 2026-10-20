"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema, LoginTypeSchema } from "@/schema/loginSchema";
import { signIn } from "@/apis/SignIn";

const Login = () => {
  const router = useRouter();
  const form = useForm<LoginTypeSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function signInMain(values: LoginTypeSchema) {
    const success = await signIn(values);

    if (success) {
      router.push("/");
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10 dark:border-gray-800 dark:bg-gray-900">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl dark:bg-green-950">
            🛒
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Login FreshCart E-Commerce 
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Join FreshCart and start shopping today!
          </p>
        </div>

        {/* Form Design */}
        <form onSubmit={form.handleSubmit(signInMain)} className="space-y-3">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter Your Email</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Enter Your Password
                </FieldLabel>
                <Input
                  {...field}
                  type="password"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-green-600 py-3.5 font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        {/* Footer
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?
          <a
            href="/login"
            className="font-bold text-green-600 transition hover:text-green-700"
          >
            Sign in
          </a>
        </p>

        <p className="mt-6 text-center text-xs text-gray-400">
          By creating an account, you agree to our Terms & Privacy Policy.
        </p> */}
      </div>
    </section>
  );
};

export default Login;
