import { persist, createJSONStorage } from 'zustand/middleware'
import { Session, User, WeakPassword } from '@supabase/supabase-js'
import { create } from 'zustand'

interface LoginAuth {
  user: User;
  session: Session;
  weakPassword?: WeakPassword | undefined;
}

interface AuthStoreProps {
  auth: LoginAuth | undefined
  setAuth: (auth: LoginAuth) => void
  getAuth: () => LoginAuth | undefined
}


export const useAuthStore = create<AuthStoreProps>()(
  persist(
    (set, get) => ({
      auth: undefined,
      setAuth: (auth) => set({ auth }),
      getAuth: () => get().auth,
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)