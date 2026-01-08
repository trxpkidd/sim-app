import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import Login from './Login';
import Register from './Register';

export default function AuthWrapper({ children }) {
  const { user, loading, init } = useAuthStore();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    init();
  }, [init]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-900">
        <div className="text-stone-100 text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return children;
}
