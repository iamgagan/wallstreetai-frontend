import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createUserSlice, UserSlice } from "./slices/user";

export const useUserStore = create<UserSlice>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
    }),
    {
      name: "breakthewall-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
