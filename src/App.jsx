import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { connectSocket, disconnectSocket, joinRoom } from './lib/socket';
import AuthWrapper from './components/Auth/AuthWrapper';
import Header from './components/Header';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const { user, authenticated } = useAuthStore();

  useEffect(() => {
    if (authenticated && user) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const socket = connectSocket(token);
        
        // Join role-based room
        if (user.role) {
          joinRoom(user.role);
          joinRoom(`user:${user.id}`);
        }
        
        return () => {
          disconnectSocket();
        };
      }
    }
  }, [authenticated, user]);

  return (
    <AuthWrapper>
      <div className="h-screen w-screen flex flex-col bg-stone-900">
        {/* Header */}
        <Header />
        
        {/* Navigation and Content */}
        <Navigation />
      </div>
    </AuthWrapper>
  );
}

export default App;
