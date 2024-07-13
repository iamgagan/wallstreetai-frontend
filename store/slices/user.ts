import { StateCreator } from "zustand";

export interface UserSlice {
  firstName: string;
  lastName: string;
  email: string;
  sessionId: string;
  isLoggedIn: boolean;
  updateSessionId: (sessionId: string) => void;
  updateFirstName: (firstName: string) => void;
  updateLastName: (lastName: string) => void;
  updateEmail: (email: string) => void;
  updateIsLoggedIn: (isLoggedIn: boolean) => void;
  resetYourDetails: () => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  sessionId: "",
  firstName: "",
  lastName: "",
  email: "",
  isLoggedIn: false,
  updateSessionId: (sessionId) => set(() => ({ sessionId })),
  updateFirstName: (firstName) => set(() => ({ firstName })),
  updateLastName: (lastName) => set(() => ({ lastName })),
  updateEmail: (email) => set(() => ({ email })),
  updateIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
  resetYourDetails: () =>
    set(() => ({
      firstName: "",
      lastName: "",
      email: "",
      sessionId: "",
    })),
});
