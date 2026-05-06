/**
 * User Store — Zustand (persisted)
 *
 * Manages authenticated user state from Prism OTP login.
 * The auth_token returned by verifyOtp() is stored here and
 * attached to outbound requests via the Axios middleware.
 *
 * Sensitive: auth_token is stored in localStorage via Zustand persist.
 * For production, rotate to an httpOnly cookie approach if your backend
 * supports a BFF (Backend-for-Frontend) pattern.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      /** @type {string|null} */
      userId: null,
      name: null,
      phone: null,
      email: null,
      /** @type {string|null} Prism JWT / session token */
      authToken: null,

      isAuthenticated() {
        return Boolean(get().authToken);
      },

      /**
       * Called after successful OTP verification.
       * @param {{ user_id, name, phone, email, auth_token }} profile
       */
      setUser({ user_id, name, phone, email, auth_token }) {
        set({
          userId: user_id,
          name,
          phone,
          email,
          authToken: auth_token,
        });
      },

      clearUser() {
        set({ userId: null, name: null, phone: null, email: null, authToken: null });
      },
    }),
    {
      name: 'blended-user',
      partialize: (state) => ({
        userId: state.userId,
        name: state.name,
        phone: state.phone,
        email: state.email,
        authToken: state.authToken,
      }),
    },
  ),
);
