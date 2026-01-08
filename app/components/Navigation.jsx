import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import AdminDashboard from './Dashboards/AdminDashboard';
import ModeratorDashboard from './Dashboards/ModeratorDashboard';
import NationLeaderDashboard from './Dashboards/NationLeaderDashboard';
import MapView from './MapView';
import Sidebar from './Sidebar';

export default function Navigation() {
  const { user } = useAuthStore();
  const [view, setView] = useState('map');

  const getDefaultView = () => {
    if (user?.role === 'admin') return 'admin';
    if (user?.role === 'moderator') return 'moderator';
    if (user?.role === 'player') return 'nation';
    return 'map';
  };

  const currentView = view || getDefaultView();

  const navItems = [
    { id: 'map', label: 'Map', roles: ['admin', 'moderator', 'player', 'observer'] },
    { id: 'admin', label: 'Admin Dashboard', roles: ['admin'] },
    { id: 'moderator', label: 'Moderator Dashboard', roles: ['admin', 'moderator'] },
    { id: 'nation', label: 'My Nation', roles: ['admin', 'player'] },
  ].filter(item => item.roles.includes(user?.role));

  const renderView = () => {
    switch (currentView) {
      case 'admin':
        return <AdminDashboard />;
      case 'moderator':
        return <ModeratorDashboard />;
      case 'nation':
        return <NationLeaderDashboard />;
      case 'map':
      default:
        return (
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 relative">
              <MapView />
            </div>
            <Sidebar />
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Navigation Tabs */}
      <nav className="bg-stone-800 border-b border-stone-700 px-6 py-2 flex gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`px-4 py-2 rounded-t transition-colors ${
              currentView === item.id
                ? 'bg-stone-900 text-amber-400 border-t border-x border-stone-700'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {renderView()}
      </div>
    </div>
  );
}
