/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://adpejjieppqtzmydtdxf.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkcGVqamllcHBxdHpteWR0ZHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0OTQ2NDgsImV4cCI6MjA1NzA3MDY0OH0.gqsRTRXwbyO6F3BHEi7eheDRu99SpEvnq2Q3kAJEkkA',
  },
}

export default nextConfig