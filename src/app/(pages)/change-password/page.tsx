
"use client";

import { changePassword } from "@/apis/updatePassword";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  changePasswordSchema,
  changePasswordTypeSchema,
} from "@/schema/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import {
  LuArrowLeft,
  LuCircleCheck,
  LuKeyRound,
  LuLockKeyhole,
  LuShieldCheck,
} from "react-icons/lu";

const ChangePassword = () => {
  const router = useRouter();

  const form = useForm<changePasswordTypeSchema>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  async function changePasswordUser(values: changePasswordTypeSchema) {
    const success = await changePassword(values);

    if (success) {
      router.push("/login");
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <main className="relative flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6 lg:py-16">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative w-full max-w-xl">
        {/* Back Link */}
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-green-700"
        >
          <LuArrowLeft className="size-4" />
          Back to Profile
        </Link>

        {/* Form Card */}
        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 px-6 py-8 text-white sm:px-10 sm:py-10">
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full border-[24px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-16 right-24 size-36 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-inner backdrop-blur-sm sm:size-16">
                <LuLockKeyhole className="size-7 sm:size-8" />
              </div>

              <div>
                <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-green-50">
                  <LuShieldCheck className="size-3.5" />
                  Account Security
                </span>

                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Change Password
                </h1>

                <p className="mt-2 max-w-sm text-sm leading-6 text-green-50/90 sm:text-base">
                  Keep your account secure by choosing a strong new password.
                </p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="mb-7 flex items-start gap-3 rounded-2xl border border-green-100 bg-green-50/80 p-4">
              <LuShieldCheck className="mt-0.5 size-5 shrink-0 text-green-700" />

              <p className="text-sm leading-6 text-slate-600">
                Enter your current password, then create and confirm your new
                password to update your account.
              </p>
            </div>

            <form
              onSubmit={form.handleSubmit(changePasswordUser)}
              className="space-y-6"
            >
              {/* Current Password */}
              <Controller
                name="currentPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-bold text-slate-700"
                    >
                      Current Password
                    </FieldLabel>

                    <div className="relative">
                      <LuKeyRound className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                      <Input
                        {...field}
                        id={field.name}
                        type="password"
                        autoComplete="current-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your current password"
                        className="h-12 rounded-xl border-slate-200 bg-slate-50/50 pl-12 pr-4 transition-all placeholder:text-slate-400 focus-visible:border-green-500 focus-visible:ring-green-500/20"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* New Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-bold text-slate-700"
                    >
                      New Password
                    </FieldLabel>

                    <div className="relative">
                      <LuLockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                      <Input
                        {...field}
                        id={field.name}
                        type="password"
                        autoComplete="new-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your new password"
                        className="h-12 rounded-xl border-slate-200 bg-slate-50/50 pl-12 pr-4 transition-all placeholder:text-slate-400 focus-visible:border-green-500 focus-visible:ring-green-500/20"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Confirm Password */}
              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-bold text-slate-700"
                    >
                      Confirm New Password
                    </FieldLabel>

                    <div className="relative">
                      <LuCircleCheck className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                      <Input
                        {...field}
                        id={field.name}
                        type="password"
                        autoComplete="new-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Confirm your new password"
                        className="h-12 rounded-xl border-slate-200 bg-slate-50/50 pl-12 pr-4 transition-all placeholder:text-slate-400 focus-visible:border-green-500 focus-visible:ring-green-500/20"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-green-600/20 transition-all duration-200 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:shadow-green-700/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <ThreeDots
                      height={28}
                      width={42}
                      color="#ffffff"
                      ariaLabel="Changing password"
                      visible
                    />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <LuLockKeyhole className="size-5 transition-transform group-hover:scale-110" />
                    <span>Change Password</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-7 border-t border-slate-100 pt-5 text-center">
              <p className="text-xs leading-5 text-slate-400">
                Your account security matters. Never share your password with
                anyone.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ChangePassword;
