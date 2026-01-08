import { useAuthStore } from '../store/authStore';
import { api } from '../lib/api';

export default function Header() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-stone-800 border-b border-stone-700 px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-stone-100">
        Discord World Map Simulation
      </h1>
      
      <div className="flex items-center gap-4">
        {user && (
          <>
            <div className="text-stone-300">
              <span className="text-stone-400">Logged in as:</span>{' '}
              <span className="font-semibold">{user.username}</span>
              {' '}
              <span className="text-xs bg-stone-700 px-2 py-1 rounded">
                {user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-stone-700 hover:bg-stone-600 text-stone-100 rounded transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
