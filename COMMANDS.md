# Quick Command Reference

## Important: Always run commands from the correct directory!

### Frontend Commands (run from `/home/johnduvert08/sim/`)

```bash
cd /home/johnduvert08/sim
npm install        # Install frontend dependencies
npm run dev        # Start frontend development server
npm run build      # Build for production
```

### Backend Commands (run from `/home/johnduvert08/sim/server/`)

```bash
cd /home/johnduvert08/sim/server
npm install        # Install backend dependencies
npm run dev        # Start backend server
npm start          # Start in production mode
```

## Common Mistakes

❌ **Wrong**: Running `npm install` from `/home/johnduvert08/`
✅ **Right**: Run from `/home/johnduvert08/sim/` or `/home/johnduvert08/sim/server/`

## Quick Start

### Setup Frontend:
```bash
cd /home/johnduvert08/sim
npm install
```

### Setup Backend:
```bash
cd /home/johnduvert08/sim/server
npm install
```

### Start Development:

Terminal 1 (Backend):
```bash
cd /home/johnduvert08/sim/server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd /home/johnduvert08/sim
npm run dev
```

## Check Your Current Directory

Always verify you're in the right place:
```bash
pwd                    # Shows current directory
ls package.json        # Should show package.json (frontend)
ls server/package.json # Should show package.json (backend)
```
