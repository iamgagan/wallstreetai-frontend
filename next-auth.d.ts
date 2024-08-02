// Import the necessary types from 'next-auth'
import { DefaultSession } from 'next-auth';
import { ResumeFile, Resume } from './types/Resume'; // Adjust the import paths accordingly

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's postal address. */
      resumeFiles?: ResumeFile[] | null;
      resumes?: Resume[] | null;
      role?: string;
      id?: string;
    } & DefaultSession['user'];
  }
}
