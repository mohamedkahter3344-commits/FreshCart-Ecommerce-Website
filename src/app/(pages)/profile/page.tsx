
"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCircleCheck,
  LuHouse,
  LuLockKeyhole,
  LuMail,
  LuShieldCheck,
  LuUserRound,
} from "react-icons/lu";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const name = session?.user?.name || "FreshCart User";
  const email = session?.user?.email || "Email not available";
  const initial = name.trim().charAt(0).toUpperCase() || "U";

  if (status === "loading") {
    return (
      <main className="flex h-screen items-center justify-center bg-slate-50 px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />
          <p className="text-sm font-medium text-slate-500">
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-xl shadow-slate-200/50">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
            <LuShieldCheck className="size-8" />
          </div>

          <h1 className="text-2xl font-extrabold text-slate-800">
            Sign in required
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Please sign in to view and manage your profile.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
          >
            Go to Login
            <LuArrowRight className="size-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <div className="mb-7 flex items-center gap-2 text-sm text-slate-500">
          <Link
            href="/"
            className="transition hover:text-green-700"
          >
            Home
          </Link>

          <span>/</span>

          <span className="font-semibold text-green-700">
            My Profile
          </span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-green-600">
            Account Center
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Manage your personal information and keep your account secure.
          </p>
        </div>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/40">
          {/* Green Banner */}
          <div className="relative h-36 overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-emerald-400 sm:h-44">
            <div className="absolute -right-10 -top-24 size-64 rounded-full border-[32px] border-white/10" />
            <div className="absolute -bottom-24 left-1/3 size-56 rounded-full bg-white/10" />

            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:left-8">
              <LuShieldCheck className="size-4" />
              Personal Account
            </div>

            <div className="absolute right-6 top-6 hidden rounded-xl bg-white/10 p-3 text-white backdrop-blur-sm sm:block">
              <LuUserRound className="size-6" />
            </div>
          </div>

          {/* Profile Information */}
          <div className="px-5 pb-7 sm:px-9 sm:pb-9">
            {/* Avatar */}
            <div className="-mt-16 flex flex-col items-center text-center sm:-mt-[76px]">
              <div className="relative flex size-32 items-center justify-center rounded-full border-[6px] border-white bg-gradient-to-br from-green-100 to-emerald-200 shadow-lg sm:size-36">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={`${name} profile picture`}
                    fill
                    sizes="144px"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="select-none text-5xl font-extrabold text-green-700 sm:text-6xl">
                    {initial}
                  </span>
                )}

                <span
                  className="absolute bottom-1 right-1 size-6 rounded-full border-4 border-white bg-green-500 sm:size-7"
                  title="Account active"
                />
              </div>

              <h2 className="mt-5 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                {name}
              </h2>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">
                <LuMail className="size-4 text-green-600" />
                <span className="break-all">{email}</span>
              </div>

              {/* Account Status */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
                <LuCircleCheck  className="size-[18px]" />
                Account Active
              </div>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                Welcome to FreshCart! Your profile information is displayed below.
              </p>
            </div>

            {/* Details */}
            <div className="mt-9 grid grid-cols-1 gap-4 border-t border-slate-100 pt-7 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <LuUserRound className="size-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Full Name
                  </p>

                  <p className="mt-1 break-words font-bold text-slate-800">
                    {name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <LuMail className="size-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email Address
                  </p>

                  <p className="mt-1 break-all font-bold text-slate-800">
                    {email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:col-span-2">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <LuShieldCheck className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Account Status
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-800">
                      Active
                    </span>

                    <span className="size-2 rounded-full bg-green-500" />

                    <span className="text-sm text-slate-500">
                      You are signed in successfully.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-7 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition duration-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700 active:scale-[0.98]"
              >
                <LuHouse className="size-[18px]" />
                Back to Home
              </Link>

              <Link
                href="/change-password"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition duration-200 hover:bg-green-700 hover:shadow-green-700/25 active:scale-[0.98]"
              >
                <LuLockKeyhole className="size-[18px]" />
                Change Password
                <LuArrowLeft className="size-4 rotate-180" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
          Keep your account information up to date for a better shopping experience.
        </p>
      </div>
    </main>
  );
}
