// Quick environment variable check script
// This runs in Node.js to test server-side env vars
import dotenv from 'dotenv';
import { readFileSync } from 'fs';

// Load .env.local
dotenv.config({ path: '.env.local' });

console.log('\n=== Environment Variables Check ===\n');

const checks = {
  'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL,
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 30)}...` : undefined,
  'SUPABASE_SERVICE_ROLE_KEY': process.env.SUPABASE_SERVICE_ROLE_KEY ? `${process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 30)}...` : undefined,
};

Object.entries(checks).forEach(([key, value]) => {
  const status = value ? '✅' : '❌';
  console.log(`${status} ${key}: ${value || 'NOT SET'}`);
});

console.log('\n=== Node.js Version Check ===\n');
console.log(`Current: Node.js ${process.version}`);
console.log(`Required: Node.js >=20.9.0 (for Next.js 16)`);
console.log(`Status: ${process.version.match(/v(\d+)/)?.[1] >= '20' ? '✅ OK' : '❌ TOO OLD'}`);

console.log('\n=== Next.js Package Check ===\n');
try {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  const hasNext = packageJson.dependencies?.next || packageJson.devDependencies?.next;
  console.log(`Next.js installed: ${hasNext ? `✅ ${hasNext}` : '❌ NOT FOUND'}`);
} catch (e) {
  console.log('❌ Could not read package.json');
}
