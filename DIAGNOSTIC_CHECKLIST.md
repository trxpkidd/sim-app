# Diagnostic Checklist - What Error Are You Seeing?

Since you've reproduced the issue, please check which of these applies:

## Common Next.js Errors After Node.js Upgrade

### Error Type 1: Module Resolution Errors
**Symptoms**: 
- "Module not found: Can't resolve '@/store/authStore'"
- "Cannot find module '@/lib/api'"
**Likely Cause**: TypeScript path mapping not working for JavaScript files

### Error Type 2: Environment Variable Errors  
**Symptoms**:
- "Missing Supabase environment variables"
- "process.env.NEXT_PUBLIC_SUPABASE_URL is undefined"
**Likely Cause**: .env.local not being loaded correctly

### Error Type 3: Build/Compilation Errors
**Symptoms**:
- TypeScript errors
- Syntax errors
- Import/export errors
**Likely Cause**: Type mismatches, syntax issues

### Error Type 4: Runtime Errors
**Symptoms**:
- Application starts but crashes
- API routes return 500 errors
- Supabase connection failures
**Likely Cause**: Runtime logic errors, missing data

### Error Type 5: Still Node.js Version Error
**Symptoms**:
- "Node.js version '>=20.9.0' is required"
**Likely Cause**: Node.js not actually upgraded in the current shell

## What to Provide

Please share:
1. The exact error message you're seeing
2. Where it appears (terminal, browser console, etc.)
3. When it occurs (build time, runtime, API call, etc.)

This will help me add the right instrumentation and fix the specific issue.
