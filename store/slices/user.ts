import { StateCreator } from "zustand";

export interface UserSlice {
  name: string;
  email: string;
  imgSrc: string;
  sessionId: string;
  isLoggedIn: boolean;
  updateSessionId: (sessionId: string) => void;
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
  updateImageSrc: (imgSrc: string) => void;
  updateIsLoggedIn: (isLoggedIn: boolean) => void;
  resetYourDetails: () => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  sessionId: "",
  name: "",
  email: "",
  imgSrc: "",
  isLoggedIn: false,
  updateSessionId: (sessionId) => set(() => ({ sessionId })),
  updateName: (name) => set(() => ({ name })),
  updateEmail: (email) => set(() => ({ email })),
  updateImageSrc: (imgSrc) => set(() => ({ imgSrc })),
  updateIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
  resetYourDetails: () =>
    set(() => ({
      firstName: "",
      lastName: "",
      email: "",
      sessionId: "",
    })),
});
