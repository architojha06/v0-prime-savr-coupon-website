import { createBrowserClient } from "@supabase/ssr"

// Use the legacy project URL and anon key directly so that
// the browser client always talks to the correct Supabase instance.
const supabaseUrl = "https://adpejjieppqtzmydtdxf.supabase.co"

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkcGVqamllcHBxdHpteWR0ZHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4OTIwMzAsImV4cCI6MjA4ODQ2ODAzMH0.gqsRTRXwbyO6F3BHEi7eheDRu99SpEvnq2Q3kAJEkkA"

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

export function createAuthedClient(accessToken: string) {
  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  })
}