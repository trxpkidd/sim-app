
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow serving large static files or external packages if needed
  serverExternalPackages: ['@supabase/supabase-js'],
  experimental: {
    // turbopack options go here if needed
  },
}

export default nextConfig;
