# Node.js Version Requirement

⚠️ **Next.js requires Node.js version >= 20.9.0**

You currently have: Node.js 18.20.8

## Solutions

### Option 1: Upgrade Node.js (Recommended)

```bash
# Using nvm (Node Version Manager)
nvm install 20
nvm use 20

# Or download from nodejs.org
# https://nodejs.org/
```

### Option 2: Use Node 20 in Docker

If you can't upgrade system Node.js, use Docker or a Node version manager.

### Option 3: Continue with Current Setup

The migration structure is complete, but you'll need Node 20+ to run Next.js.

All the code is ready - just upgrade Node.js and run:
```bash
npm run dev
```
