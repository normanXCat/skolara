import { create } from "zustand";
import api from "@/lib/api-client";

export interface AuthUser {
    id: number;
    firstName: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;

    /** Fetch the current user from /auth/me */
    fetchUser: () => Promise<void>;

    /** Set user directly (e.g. after login) */
    setUser: (user: AuthUser) => void;

    /** Clear user state (e.g. on logout) */
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,

    fetchUser: async () => {
        if (get().user || get().isLoading) return; // Already loaded or in-flight
        set({ isLoading: true });
        try {
            const res = await api.get<AuthUser>("/auth/me");
            if (res.success && res.data) {
                set({ user: res.data, isAuthenticated: true });
            } else {
                // Le refresh a échoué ou la session est invalide
                set({ user: null, isAuthenticated: false });
            }
        } catch {
            set({ user: null, isAuthenticated: false });
        } finally {
            set({ isLoading: false });
        }
    },

    setUser: (user) => set({ user, isAuthenticated: true }),

    clearUser: () => set({ user: null, isAuthenticated: false }),
}));
