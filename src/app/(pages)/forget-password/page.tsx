
"use client";

import React, { useState } from "react";
import { defineStepper } from "@stepperize/react";
import {
  FaEnvelope,
  FaShieldAlt,
  FaLock,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordUser } from "@/apis/forgetPasssword";
import * as z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetCodeUser } from "@/apis/verfiyCode";
import { updateForgetPasswordUser } from "@/apis/updateForgetPassword";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
  const forgetPassword = defineStepper([
    { id: "emailAddress", title: "Email Address" },
    { id: "verifyCode", title: "Verify Code" },
    { id: "newPassword", title: "New Password" },
  ]);

  const steps = forgetPassword.steps;

  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  // Step 1: Email

  const forgetPasswordSchema = z.object({
    email: z.email("Please enter a valid email address"),
  });

  type ForgetPasswordTypeSchema = z.infer<typeof forgetPasswordSchema>;

  const formForgetPassword = useForm<ForgetPasswordTypeSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordSchema),
  });

  const { isSubmitting: isSubmittingEmail } =
    formForgetPassword.formState;

  async function forgetPasswordUserRes(
    values: ForgetPasswordTypeSchema,
  ) {
    const success = await forgetPasswordUser(values);

    if (success) {
      setCurrentStep(1);
    }
  }

  // Step 2: Verify Code

  const resetCodeSchema = z.object({
    resetCode: z
      .string()
      .min(2, "Verification code must be at least 2 digits")
      .regex(/^\d+$/, "Code must contain numbers only"),
  });

  type ResetCodeTypeSchema = z.infer<typeof resetCodeSchema>;

  const formResetCode = useForm<ResetCodeTypeSchema>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(resetCodeSchema),
  });

  const { isSubmitting: isSubmittingCode } =
    formResetCode.formState;

  async function resetCodeUserRes(values: ResetCodeTypeSchema) {
    const success = await resetCodeUser(values);

    if (success) {
      // Keep the email from the first step
      formUpdatePassword.setValue(
        "email",
        formForgetPassword.getValues("email"),
      );

      setCurrentStep(2);
    }
  }

  // Step 3: Update Password

  const updatePasswordSchema = z.object({
    email: z.email("Invalid email address"),
    newPassword: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        "Password must be at least 6 characters and include uppercase, lowercase, number, and special character.",
      ),
  });

  type UpdatePasswordTypeSchema = z.infer<
    typeof updatePasswordSchema
  >;

  const formUpdatePassword = useForm<UpdatePasswordTypeSchema>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(updatePasswordSchema),
  });

  const { isSubmitting: isSubmittingPassword } =
    formUpdatePassword.formState;

  async function updatePasswordUserRes(
    values: UpdatePasswordTypeSchema,
  ) {
    const email = formForgetPassword.getValues("email");

    const success = await updateForgetPasswordUser({
      ...values,
      email,
    });

    if (success) {
      resetForgetPasswordForm();
      router.replace("/login");
    }
  }

  // Reset all forms after successful password update

  function resetForgetPasswordForm() {
    setCurrentStep(0);

    formForgetPassword.reset({
      email: "",
    });

    formResetCode.reset({
      resetCode: "",
    });

    formUpdatePassword.reset({
      email: "",
      newPassword: "",
    });
  }

  // Back buttons

  function goBack() {
    if (currentStep === 1) {
      setCurrentStep(0);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-12 dark:from-gray-950 dark:via-gray-900 dark:to-green-950/20">
      <div className="w-full max-w-xl">

        {/* Back to Login */}
        <Link
          href="/login"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-green-600 dark:text-gray-400"
        >
          <FaArrowLeft size={13} />
          Back to Login
        </Link>

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-green-900/5 dark:border-gray-800 dark:bg-gray-900">

          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-emerald-500 px-6 py-9 text-center text-white sm:px-10">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
              <FaLock size={27} />
            </div>

            <h1 className="text-2xl font-extrabold sm:text-3xl">
              Forgot Password?
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-green-50">
              Don't worry! Let's help you recover your account.
            </p>
          </div>

          <div className="px-6 py-9 sm:px-10">

            {/* Stepper */}
            <div className="mb-10 flex items-start justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-1 flex-col items-center">
                    <div
                      className={`flex size-11 items-center justify-center rounded-full border-2 font-bold transition ${
                        index <= currentStep
                          ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-600/20"
                          : "border-gray-200 bg-gray-50 text-gray-400 dark:border-gray-700 dark:bg-gray-800"
                      }`}
                    >
                      {index < currentStep ? (
                        <FaCheck size={15} />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <span
                      className={`mt-3 text-center text-xs font-bold sm:text-sm ${
                        index <= currentStep
                          ? "text-green-700 dark:text-green-400"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  {index !== steps.length - 1 && (
                    <div
                      className={`mt-5 h-0.5 flex-1 transition ${
                        index < currentStep
                          ? "bg-green-600"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step 1: Email Address */}
            {currentStep === 0 && (
              <form
                onSubmit={formForgetPassword.handleSubmit(
                  forgetPasswordUserRes,
                )}
                className="space-y-6"
              >
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-green-600" size={17} />

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Enter Your Email
                    </h2>
                  </div>

                  <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                    Enter the email address linked to your account.
                    We'll send you a verification code.
                  </p>
                </div>

                <Controller
                  name="email"
                  control={formForgetPassword.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Email Address
                      </FieldLabel>

                      <Input
                        {...field}
                        type="email"
                        id={field.name}
                        placeholder="e.g. name@example.com"
                        autoComplete="email"
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <button
                  type="submit"
                  disabled={isSubmittingEmail}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmittingEmail
                    ? "Sending Code..."
                    : "Send Verification Code"}

                  {!isSubmittingEmail && <FaArrowRight size={14} />}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Remember your password?
                  <Link
                    href="/login"
                    className="font-bold text-green-600 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            )}

            {/* Step 2: Verify Code */}
            {currentStep === 1 && (
              <form
                onSubmit={formResetCode.handleSubmit(resetCodeUserRes)}
                className="space-y-6"
              >
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <FaShieldAlt className="text-green-600" size={17} />

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Verify Your Email
                    </h2>
                  </div>

                  <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                    Enter the verification code sent to:
                  </p>

                  <p className="mt-1 break-all font-semibold text-green-700 dark:text-green-400">
                    {formForgetPassword.getValues("email")}
                  </p>
                </div>

                <Controller
                  name="resetCode"
                  control={formResetCode.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Verification Code
                      </FieldLabel>

                      <Input
                        {...field}
                        type="text"
                        id={field.name}
                        placeholder="Enter the code from your email"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <button
                  type="submit"
                  disabled={isSubmittingCode}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmittingCode ? "Verifying..." : "Verify Code"}

                  {!isSubmittingCode && <FaArrowRight size={14} />}
                </button>

                <button
                  type="button"
                  onClick={goBack}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:border-green-500 hover:text-green-600 dark:border-gray-700 dark:text-gray-300"
                >
                  <FaArrowLeft size={13} />
                  Back to Email
                </button>
              </form>
            )}

            {/* Step 3: New Password */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
                      <FaLock className="text-green-600" size={18} />
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Create New Password
                    </h2>
                  </div>

                  <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                    Your email has been verified. Choose a strong new password.
                  </p>
                </div>

                <form
                  onSubmit={formUpdatePassword.handleSubmit(
                    updatePasswordUserRes,
                  )}
                  className="space-y-5"
                >
                  {/* Current Email - Read Only */}
                  <Controller
                    name="email"
                    control={formUpdatePassword.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Verified Email Address
                        </FieldLabel>

                        <Input
                          {...field}
                          type="email"
                          id={field.name}
                          readOnly
                          placeholder="Your verified email will appear here"
                          className="bg-gray-50 text-gray-500 dark:bg-gray-800"
                          aria-invalid={fieldState.invalid}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* New Password */}
                  <Controller
                    name="newPassword"
                    control={formUpdatePassword.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          New Password
                        </FieldLabel>

                        <Input
                          {...field}
                          type="password"
                          id={field.name}
                          placeholder="Create a strong password"
                          autoComplete="new-password"
                          aria-invalid={fieldState.invalid}
                        />

                        <p className="text-xs text-gray-500">
                          At least 6 characters, including uppercase,
                          lowercase, a number, and a special character.
                        </p>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={isSubmittingPassword}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmittingPassword
                      ? "Resetting Password..."
                      : "Reset Password"}

                    {!isSubmittingPassword && <FaCheck size={14} />}
                  </button>

                  <button
                    type="button"
                    onClick={goBack}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:border-green-500 hover:text-green-600 dark:border-gray-700 dark:text-gray-300"
                  >
                    <FaArrowLeft size={13} />
                    Back to Verification
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          © FreshCart. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default ForgetPassword;
