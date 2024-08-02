export interface Resume {
  id?: string;
  resumeFileId?: string;
  userId: string;
  personalInfo?: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  qualifications: Qualification[];
  skills?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ExtractedResumeData {
  personal_details: PersonalInfo;
  education: Education[];
  work_experience: WorkExperience[];
  qualifications: Qualification[];
}

export interface ResumeFile {
  id?: string;
  resumeId?: string;
  file: string;
  fileType: string;
  fileName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate: string;
  currentlyStudyingHere?: string;
  description: string;
  enhancedDescription: string;
}

export interface WorkExperience {
  company: string;
  jobTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorkingHere?: string;
  description: string;
  enhancedDescription: string;
}

export interface Qualification {
  qualification: string;
  awardedDate: string;
  institution: string;
}

export interface UserResponseType {
  id?: string;
  email: string;
  role?: string;
  emailVerified?: Date | null | boolean;
  name?: string | null;
  image?: string | null;
  resumeFiles?: ResumeFile[];
  resumes?: {
    id?: string;
    userId: string;
    personalInfo: PersonalInfo;
    education: Education[];
    workExperience: WorkExperience[];
    qualification: Qualification[];
    skills?: string[];
  }[];
  password?: string;
}
