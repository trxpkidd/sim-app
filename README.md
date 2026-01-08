# Discord World Map Simulation

A comprehensive geopolitical map dashboard for Discord simulation games, built with React, Express, and Supabase.

## Features

- 🗺️ Interactive map visualization (Azgaar Fantasy Map format)
- 👥 User management with role-based access (Admin, Moderator, Player, Observer)
- 📊 Event sourcing system with rollback capability
- 💬 Real-time messaging and notifications
- 📈 Analytics dashboards (Admin, Moderator, Nation Leader)
- 🔐 Authentication with Supabase Auth
- ⚡ Real-time updates with Socket.io

## Setup Instructions

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm or yarn
- Supabase account

### 1. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to SQL Editor and run the schema from `server/db/schema.sql`
3. Get your project URL and API keys from Settings > API

### 2. Backend Setup

```bash
cd server
npm install

# Create .env file
cp .env.example .env
# Edit .env with your Supabase credentials:
# SUPABASE_URL=your_supabase_project_url
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
# SUPABASE_ANON_KEY=your_anon_key
# PORT=3001
# CORS_ORIGIN=http://localhost:5173

# Start backend server
npm run dev
```

### 3. Frontend Setup

```bash
# In the root directory
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration:
# VITE_API_URL=http://localhost:3001/api
# VITE_SOCKET_URL=http://localhost:3001
# VITE_SUPABASE_URL=your_supabase_project_url
# VITE_SUPABASE_ANON_KEY=your_anon_key

# Start development server
npm run dev
```

### 4. Initial Admin User

After running the schema, you'll need to create your first admin user:

1. Register through the web interface
2. Go to Supabase SQL Editor and run:
```sql
UPDATE users SET role = 'admin', status = 'active' WHERE email = 'your-email@example.com';
```

## Project Structure

```
sim/
├── server/                 # Backend Express server
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth & validation middleware
│   │   └── index.js       # Server entry point
│   └── db/
│       └── schema.sql     # Database schema
├── src/                   # Frontend React app
│   ├── components/        # React components
│   ├── store/            # Zustand state management
│   ├── lib/              # Utilities & API client
│   └── utils/            # Helper functions
└── public/
    └── map.json          # Map data file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/applications` - Get pending applications (admin)
- `POST /api/users/applications` - Submit application
- `POST /api/users/applications/:id/approve` - Approve application (admin)
- `POST /api/users/applications/:id/reject` - Reject application (admin)

### Events
- `GET /api/events` - Get events
- `POST /api/events` - Create event
- `POST /api/events/:id/approve` - Approve event (admin)
- `POST /api/events/:id/reject` - Reject event (admin)
- `POST /api/events/:id/revert` - Revert event (admin)

### Nations
- `GET /api/nations` - Get all nations
- `GET /api/nations/:id` - Get nation
- `POST /api/nations` - Create nation
- `PUT /api/nations/:id` - Update nation

### Messages
- `GET /api/messages` - Get user's messages
- `POST /api/messages` - Send message
- `PUT /api/messages/:id/read` - Mark as read

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

## Development

### Backend
```bash
cd server
npm run dev  # Runs on http://localhost:3001
```

### Frontend
```bash
npm run dev  # Runs on http://localhost:5173
```

## Production Build

```bash
# Build frontend
npm run build

# Start backend (production)
cd server
npm start
```

## License

ISC
