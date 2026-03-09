"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

function withParams(path: string, params: Record<string, string | undefined>) {
  const usp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v) usp.set(k, v)
  }
  const qs = usp.toString()
  return qs ? `${path}?${qs}` : path
}

export function AuthRequiredDialog({
  open,
  onOpenChange,
  nextPath,
  message = "Please login or signup to access this feature",
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  nextPath: string
  message?: string
}) {
  const searchParams = useSearchParams()
  const reason = searchParams.get("reason") ?? "auth_required"

  const loginHref = withParams("/login", { next: nextPath, reason })
  const signupHref = withParams("/signup", { next: nextPath, reason })

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Authentication required</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href={loginHref}>Log in</Link>
          </AlertDialogAction>
          <AlertDialogAction asChild>
            <Link href={signupHref}>Sign up</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

