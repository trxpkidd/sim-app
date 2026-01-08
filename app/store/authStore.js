import { create } from 'zustand';
import { api } from '@/lib/api';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  authenticated: false,

  // Initialize auth state
  init: async () => {
    try {
      const token = api.getToken();
      if (token) {
        const user = await api.getCurrentUser();
        set({ user, authenticated: true, loading: false });
      } else {
        set({ user: null, authenticated: false, loading: false });
      }
    } catch (error) {
      console.error('Auth init error:', error);
      set({ user: null, authenticated: false, loading: false });
    }
  },

  // Login
  login: async (email, password) => {
    try {
      const data = await api.login(email, password);
      const user = await api.getCurrentUser();
      set({ user, authenticated: true });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Register
  register: async (email, password, username) => {
    try {
      await api.register(email, password, username);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ user: null, authenticated: false });
    }
  },

  // Update user data
  updateUser: (userData) => {
    set({ user: { ...get().user, ...userData } });
  },
}));
