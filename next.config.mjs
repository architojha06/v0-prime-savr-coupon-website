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
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkcGVqamllcHBxdHpteWR0ZHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4OTIwMzAsImV4cCI6MjA4ODQ2ODAzMH0.gqsRTRXwbyO6F3BHEi7eheDRu99SpEvnq2Q3kAJEkkA',
    SUPABASE_SERVICE_ROLE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkcGVqamllcHBxdHpteWR0ZHhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjg5MjAzMCwiZXhwIjoyMDg4NDY4MDMwfQ.3vGwhCyh1y3WNWr-GwJA6as9wnJ1QnacfzplPjjVwnQ',
  }, 
}

export default nextConfig