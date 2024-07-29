import { db } from "@/lib/db";

export const getUserByEmail = async (email: string | undefined) => {
  if (!email || db.user === undefined) return null;
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        role: true,
        emailVerified: true,
        name: true,
        image: true,
        resumeFiles: true,
        resumes: true,
        password: true,
      }
    });

    const formattedUser = {
      ...user,
      resumes: user?.resumes.map((resume) => ({
        ...resume,
        personalInfo: resume.personalInfo ? JSON.parse(resume.personalInfo as string) : null,
        education: resume.education ? JSON.parse(resume.education as string) : null,
        workExperience: resume.workExperience ? JSON.parse(resume.workExperience as string) : null,
        qualification: resume.qualification ? JSON.parse(resume.qualification as string) : null,
    }))
  }

    return formattedUser;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string | undefined) => {
  if (!id || db.user === undefined) return null;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        role: true,
        emailVerified: true,
        name: true,
        image: true,
        resumeFiles: true,
        resumes: true,
      }
    });

    const formattedUser = {
      ...user,
      resumes: user?.resumes.map((resume) => ({
        ...resume,
        personalInfo: resume.personalInfo ? JSON.parse(resume.personalInfo as string) : null,
        education: resume.education ? JSON.parse(resume.education as string) : null,
        workExperience: resume.workExperience ? JSON.parse(resume.workExperience as string) : null,
        qualification: resume.qualification ? JSON.parse(resume.qualification as string) : null,
    }))
  }

    return formattedUser;
  } catch (error) {
    return null;
  }
};
