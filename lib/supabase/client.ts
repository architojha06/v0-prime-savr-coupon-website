import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://adpejjieppqtzmydtdxf.supabase.co"

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkcGVqamllcHBxdHpteWR0ZHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4OTIwMzAsImV4cCI6MjA4ODQ2ODAzMH0.gqsRTRXwbyO6F3BHEi7eheDRu99SpEvnq2Q3kAJEkkA"

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

export function createClient() {
  return supabase
}
