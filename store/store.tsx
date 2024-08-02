'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createUserSlice, UserSlice } from './slices/user';
import { type ReactNode, createContext, useRef, useContext } from 'react';

export type StoreApi = ReturnType<typeof useUserStore>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export interface StoreProviderProps {
  children: ReactNode;
}

export const useUserStore = create<UserSlice>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
    }),
    {
      name: 'breakthewall-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const store = useUserStore();
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
