# Complete Setup Guide

## Quick Start

1. **Set up Supabase**
   - Create account at https://supabase.com
   - Create new project
   - Go to SQL Editor
   - Copy and paste the entire contents of `server/db/schema.sql`
   - Run the SQL script
   - Go to Settings > API
   - Copy your Project URL, anon/public key, and service_role key

2. **Backend Configuration**
   ```bash
   cd server
   npm install
   ```
   
   Create `server/.env`:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   SUPABASE_ANON_KEY=your_anon_key_here
   PORT=3001
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   JWT_SECRET=your_random_secret_key_here
   ```
   
   Start backend:
   ```bash
   npm run dev
   ```

3. **Frontend Configuration**
   ```bash
   # In root directory
   npm install
   ```
   
   Create `.env` in root:
   ```
   VITE_API_URL=http://localhost:3001/api
   VITE_SOCKET_URL=http://localhost:3001
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
   
   Start frontend:
   ```bash
   npm run dev
   ```

4. **Create First Admin**
   - Register a new account through the web interface
   - Go to Supabase Dashboard > Table Editor > users
   - Find your user record
   - Edit the record:
     - Set `role` to `admin`
     - Set `status` to `active`
   - Or run SQL:
     ```sql
     UPDATE users SET role = 'admin', status = 'active' WHERE email = 'your-email@example.com';
     ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Health check: http://localhost:3001/health

## Troubleshooting

### Database Connection Issues
- Verify your Supabase credentials in `.env` files
- Check that the schema was run successfully
- Ensure RLS policies allow access (or use service_role key)

### CORS Errors
- Make sure `CORS_ORIGIN` in server `.env` matches your frontend URL
- Check that backend server is running

### Authentication Issues
- Verify Supabase Auth is enabled in your project
- Check that users table is properly linked to auth.users
- Ensure JWT tokens are being stored in localStorage

### Map Not Loading
- Verify `public/map.json` exists
- Check browser console for errors
- Ensure file size isn't causing issues

## Next Steps

- Import your map data into the database
- Set up nations and regions
- Configure user roles and permissions
- Customize dashboard components
- Set up Discord webhook integration (optional)
