import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER' | 'VENDOR';
}

interface UserState {
  currentUser: User | null;
  impersonatedUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  impersonate: (user: User) => void;
  stopImpersonating: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Mock an initial admin login for prototype purposes
      currentUser: { id: 'admin-1', name: 'Admin', email: 'admin@manevia.com', role: 'ADMIN' },
      impersonatedUser: null,

      login: (user) => set({ currentUser: user, impersonatedUser: null }),
      logout: () => set({ currentUser: null, impersonatedUser: null }),
      
      impersonate: (user) => set({ impersonatedUser: user }),
      stopImpersonating: () => set({ impersonatedUser: null }),
    }),
    {
      name: 'manevia-user-storage',
    }
  )
);
