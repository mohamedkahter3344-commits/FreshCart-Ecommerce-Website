
"use client"

import { signOut, useSession } from "next-auth/react"
import {
  LuChevronDown,
  LuLogOut,
  LuLockKeyhole,
  LuUserRound,
} from "react-icons/lu"
import Link from "next/link";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuNavbar() {
  const { data: session } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="group flex h-11 items-center gap-2 rounded-xl border-slate-200 bg-white px-3 text-slate-700 shadow-sm transition-all duration-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700 focus-visible:ring-2 focus-visible:ring-green-500 sm:h-12 sm:px-4"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-green-100 text-green-700 transition-colors group-hover:bg-green-200">
              <LuUserRound className="size-[18px]" />
            </span>

            <span className="hidden text-sm font-semibold sm:inline">
              Account
            </span>

            <LuChevronDown className="size-4 text-slate-400 transition-transform duration-200 group-data-popup-open:rotate-180" />
          </Button>
        }
      />

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-60 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/60"
      >
        <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white shadow-sm">
            <LuUserRound className="size-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-800">
              {session?.user?.name || "My Account"}
            </p>

            <p className="truncate text-xs text-slate-500">
              {session?.user?.email || "Manage your account"}
            </p>
          </div>
        </div>

        <div className="mt-2 space-y-1">
          <Link href="/profile">
          
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors focus:bg-green-50 focus:text-green-700"
          >
            <LuUserRound className="size-[18px] text-slate-500" />
            <span>Profile</span>
          </DropdownMenuItem>
          </Link>

          <Link href="/change-password">
          
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors focus:bg-green-50 focus:text-green-700"
          >
            <LuLockKeyhole className="size-[18px] text-slate-500" />
            <span>Change Password</span>
          </DropdownMenuItem>
          </Link>

        </div>

        <DropdownMenuSeparator className="my-2 bg-slate-100" />

        <DropdownMenuItem
          variant="destructive"
          className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition-colors focus:bg-red-50 focus:text-red-700"
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
        >
          <LuLogOut className="size-[18px]" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
