# Runtime Environment Blocker

## Current Situation

**Issue**: Cannot run the application because Node.js/npm are not available in the current shell environment.

**Error**: `npm: command not found`

## What's Needed

To run the Next.js application, you need:

1. **Node.js version 20.9.0 or higher** (Next.js 16 requirement)
2. **npm** (comes bundled with Node.js)
3. **Both in your PATH**

## Solutions

### Option 1: Use nvm (Node Version Manager)

If you have nvm installed:

```bash
# Source nvm (adjust path if needed)
source ~/.nvm/nvm.sh
# OR
source ~/.bashrc  # if nvm is loaded there

# Install and use Node.js 20
nvm install 20
nvm use 20

# Verify
node --version  # Should show v20.x.x
npm --version

# Run the application
cd /home/johnduvert08/sim
npm run dev
```

### Option 2: Install Node.js Directly

Download and install from https://nodejs.org/
- Choose the LTS version (currently 20.x)
- Follow installation instructions for your OS
- Ensure it's added to PATH

### Option 3: Use Full Path

If Node.js is installed but not in PATH:

```bash
# Find where Node.js is installed
which node  # if in some PATH
find /usr -name node 2>/dev/null  # search common locations

# Use full path
/path/to/node /path/to/npm run dev
```

## Once Node.js is Available

After Node.js 20+ is available, the application should run:

```bash
cd /home/johnduvert08/sim
npm run dev
```

The application will:
1. Check Node.js version (must be >=20.9.0)
2. Start the Next.js development server
3. Be available at http://localhost:3000

## Code Status

✅ All code fixes have been applied:
- TypeScript path mapping fixed
- Environment variables configured
- Package dependencies installed
- API routes structure ready

The application is ready to run once Node.js is available!
