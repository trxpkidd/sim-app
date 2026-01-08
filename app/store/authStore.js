import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  authenticated: false,

  // Initialize auth state
  init: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // Fetch public user data
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        set({
          user: profile || session.user,
          authenticated: true,
          loading: false
        });
      } else {
        set({ user: null, authenticated: false, loading: false });
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          set({ user: profile || session.user, authenticated: true });
        } else if (event === 'SIGNED_OUT') {
          set({ user: null, authenticated: false });
        }
      });

    } catch (error) {
      console.error('Auth init error:', error);
      set({ user: null, authenticated: false, loading: false });
    }
  },

  // Login
  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Profile fetch is handled by onAuthStateChange, but we can double check here or return success
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Register
  register: async (email, password, username) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      });

      if (error) throw error;

      // If we need to manually create the public user record, do it here
      // Assuming a trigger might exist, but if not we should insert.
      // For safety in this environment, let's try to insert if it doesn't exist?
      // Or just return success and let the user profile handle it.

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Logout
  logout: async () => {
    try {
      await supabase.auth.signOut();
      // State update handled by onAuthStateChange
    } catch (error) {
      console.error('Logout error:', error);
      set({ user: null, authenticated: false });
    }
  },

  // Update user data
  updateUser: (userData) => {
    set({ user: { ...get().user, ...userData } });
  },
}));
