import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  console.log("ADMIN LAYOUT - user:", user?.email, "error:", userError)

  if (!user) {
    console.log("ADMIN LAYOUT - no user, redirecting to login")
    redirect("/login")
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  console.log("ADMIN LAYOUT - profile:", profile, "error:", profileError)

  if (!profile?.is_admin) {
    console.log("ADMIN LAYOUT - not admin, redirecting to home")
    redirect("/")
  }

  return <>{children}</>
}