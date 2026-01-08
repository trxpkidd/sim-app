import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix for Next.js 16: serverExternalPackages at top level
  serverExternalPackages: ['@supabase/supabase-js'],

  // Fix for Lockfile Warning: turbopack is now a top-level key in Next.js 16
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
