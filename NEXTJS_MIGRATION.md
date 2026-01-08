# Next.js Migration Guide

## Status: ✅ Basic Structure Created

The project has been migrated to Next.js with the App Router.

### What's Done

✅ Next.js installed and configured
✅ App Router structure created (`app/` directory)
✅ Components, stores, and libs copied
✅ Basic API route structure created
✅ Environment variables configured
✅ TypeScript configuration added

### What Needs to be Done

1. **Fix Import Paths**
   - Update all imports from `'../store/...'` to `'@/store/...'`
   - Update all imports from `'../lib/...'` to `'@/lib/...'`
   - Update all imports from `'../components/...'` to `'@/components/...'`

2. **Convert API Routes**
   - Migrate Express routes from `server/src/routes/` to Next.js API routes in `app/api/`
   - Example: `server/src/routes/auth.js` → `app/api/auth/login/route.ts`

3. **Update API Client**
   - Modify `lib/api.js` to use Next.js API routes (`/api/...` instead of `http://localhost:3001/api/...`)

4. **Fix Socket.io**
   - Socket.io needs to run on a separate server or use Next.js API routes with Server-Sent Events
   - Consider using Supabase Realtime instead

5. **Update File Extensions**
   - Convert `.jsx` files to `.tsx` (TypeScript)
   - Convert `.js` files to `.ts` where appropriate

### Running the Application

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Key Differences from Vite

- **File-based routing**: Pages are in `app/` directory
- **API Routes**: Instead of Express, use `app/api/` directory
- **Server Components**: Can use server components by default
- **Environment Variables**: Use `NEXT_PUBLIC_` prefix for client-side vars

### Next Steps

1. Start fixing import paths in components
2. Convert one API route at a time
3. Test each route as you convert it
4. Update the API client
5. Test the full application
