# Quick Start Guide

Get your Discord World Map Simulation running in 5 minutes!

## Step 1: Supabase Setup (2 minutes)

1. Go to https://supabase.com and create a free account
2. Click "New Project"
3. Fill in project details (name, database password, region)
4. Wait for project to be created (takes ~2 minutes)

## Step 2: Database Setup (1 minute)

1. In your Supabase project, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `server/db/schema.sql`
4. Paste and click **Run**
5. Wait for "Success. No rows returned"

## Step 3: Get API Keys (30 seconds)

1. Go to **Settings** > **API**
2. Copy these three values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")
   - **service_role** key (under "Project API keys" - keep this secret!)

## Step 4: Backend Setup (1 minute)

```bash
cd server
npm install
```

Create `server/.env`:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_ANON_KEY=your_anon_key_here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=any-random-string-here
```

Start backend:
```bash
npm run dev
```

You should see: `Server running on port 3001`

## Step 5: Frontend Setup (30 seconds)

In the root directory, create `.env`:
```env
VITE_API_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Start frontend:
```bash
npm run dev
```

Open http://localhost:5173 in your browser!

## Step 6: Create Admin Account (1 minute)

1. Click "Register" on the login page
2. Create an account (email, username, password)
3. Go back to Supabase Dashboard
4. Go to **Table Editor** > **users**
5. Find your user record (by email)
6. Click the row to edit
7. Change:
   - `role` → `admin`
   - `status` → `active`
8. Save
9. Refresh your browser and login again

## You're Done! 🎉

You should now see:
- Login screen (if not logged in)
- Map view (after login)
- Admin Dashboard (if you're an admin)
- Navigation tabs at the top

## Troubleshooting

**Backend won't start:**
- Check `.env` file exists in `server/` directory
- Verify all environment variables are set
- Check port 3001 isn't already in use

**Frontend shows errors:**
- Check `.env` file exists in root directory
- Verify backend is running on port 3001
- Check browser console for errors

**Can't login:**
- Verify user exists in Supabase `users` table
- Check user `status` is set to `active`
- Check browser console for API errors

**Map doesn't load:**
- Verify `public/map.json` exists
- Check file size (should be several MB)
- Check browser console for errors

## Next Steps

- Import your map data into the database
- Set up nations and regions
- Customize the dashboards
- Add more features from the specification

Need help? Check the full README.md or IMPLEMENTATION_NOTES.md files.
