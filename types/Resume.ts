export interface Resume {
    id?: string;
    userId: string;
    file: string;
    fileType: string;
    fileName: string;
    personalInfo: PersonalInfo;
    education: Education[];
    workExperience: WorkExperience[];
    qualification: Qualification[];
    skills: string[];
    createdAt: string;
    updatedAt: string;
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
    country: string;
    postalCode: string;
}

export interface Education {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    currentlyStudyingHere?: boolean;
    description: string;
}

export interface WorkExperience {
    company: string;
    jobTitle: string;
    location: string;
    startDate: string;
    endDate: string;
    currentlyWorkingHere?: boolean;
    description: string;
}

export interface Qualification {
    qualification: string;
    awardedDate: string;
    institution: string;
}