import { Resume, ResumeFile } from "@/types/Resume";
import { StateCreator } from "zustand";

export interface UserSlice {
  name: string;
  userId: string;
  email: string;
  imgSrc: string;
  sessionId: string;
  isLoggedIn: boolean;
  resumeFiles: ResumeFile[];
  resumes: Resume[];
  selectedResumeFile: ResumeFile | null;
  selectedResume: Resume | null;
  isUploadWithAI: boolean;
  updateSessionId: (sessionId: string) => void;
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
  updateUserId: (userId: string) => void;
  updateImageSrc: (imgSrc: string) => void;
  updateIsLoggedIn: (isLoggedIn: boolean) => void;
  updateResumeFiles: (resumeFiles: ResumeFile[]) => void;
  updateResumes: (resumes: Resume[]) => void;
  updateSelectedResumeFile: (selectedResumeFile: ResumeFile) => void;
  updateSelectedResume: (selectedResume: Resume) => void;
  updateIsUploadWithAI: (isUploadWithAI: boolean) => void;
  resetUserDetails: () => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  sessionId: "",
  userId: "",
  name: "",
  email: "",
  imgSrc: "",
  isLoggedIn: false,
  resumeFiles: [],
  resumes: [],
  selectedResumeFile: null,
  selectedResume: null,
  isUploadWithAI: false,
  updateSessionId: (sessionId) => set(() => ({ sessionId })),
  updateName: (name) => set(() => ({ name })),
  updateEmail: (email) => set(() => ({ email })),
  updateImageSrc: (imgSrc) => set(() => ({ imgSrc })),
  updateIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
  updateUserId: (userId) => set(() => ({ userId })),
  updateResumeFiles: (resumeFiles) => set(() => ({ resumeFiles })),
  updateResumes: (resumes) => set(() => ({ resumes })),
  updateSelectedResumeFile: (selectedResumeFile) =>
    set(() => ({ selectedResumeFile })),
  updateSelectedResume: (selectedResume) =>
    set(() => ({ selectedResume })),
  updateIsUploadWithAI: (isUploadWithAI) => set(() => ({ isUploadWithAI })),
  resetUserDetails: () =>
    set(() => ({
      firstName: "",
      lastName: "",
      email: "",
      sessionId: "",
      userId: "",
    })),
});
