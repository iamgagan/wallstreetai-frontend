import { db } from '@/lib/db';
import { Resume, ResumeFile } from '@/types/Resume';

export const getResumesByEmail = async (email: string | undefined) => {
  if (!email || db.user === undefined) return null;
  try {
    const resumes = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        resumes: true,
      },
    });
    if (resumes?.resumes) {
      const formattedResumes = resumes.resumes
        .map((resume) => ({
          ...resume,
          personalInfo: resume.personalInfo
            ? JSON.parse(resume.personalInfo as string)
            : null,
          education: resume.education
            ? JSON.parse(resume.education as string)
            : null,
          workExperience: resume.workExperience
            ? JSON.parse(resume.workExperience as string)
            : null,
          qualification: resume.qualification
            ? JSON.parse(resume.qualification as string)
            : null,
        }))
        .sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate());

      return formattedResumes;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getResumesByUserId = async (userId: string | undefined) => {
  if (!userId || db.user === undefined) return null;
  try {
    const resumes = await db.resume.findMany({
      where: {
        userId,
      },
    });

    if (resumes) {
      const formattedResumes = resumes
        .map((resume) => ({
          ...resume,
          personalInfo: resume.personalInfo
            ? JSON.parse(resume.personalInfo as string)
            : null,
          education: resume.education
            ? JSON.parse(resume.education as string)
            : null,
          workExperience: resume.workExperience
            ? JSON.parse(resume.workExperience as string)
            : null,
          qualification: resume.qualification
            ? JSON.parse(resume.qualification as string)
            : null,
        }))
        .sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate());
      return formattedResumes;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getResumeFilesByEmail = async (email: string | undefined) => {
  if (!email || db.user === undefined) return null;
  try {
    const resumeFiles = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        resumeFiles: true,
      },
    });

    if (resumeFiles?.resumeFiles) {
      return resumeFiles.resumeFiles.sort(
        (a, b) => b.createdAt.getDate() - a.createdAt.getDate()
      );
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getResumeFilesByUserId = async (userId: string | undefined) => {
  if (!userId || db.user === undefined) return null;
  try {
    const resumeFiles = await db.resumeFile.findMany({
      where: {
        userId,
      },
    });
    if (resumeFiles) {
      return resumeFiles.sort(
        (a, b) => b.createdAt.getDate() - a.createdAt.getDate()
      );
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getResumeByResumeFileId = async (
  resumeFileId: string | undefined
) => {
  if (!resumeFileId || db.resume === undefined) return null;
  try {
    const resume = await db.resume.findFirst({
      where: {
        resumeFileId,
      },
    });
    if (resume) {
      const formattedResume = {
        ...resume,
        personalInfo: resume.personalInfo
          ? JSON.parse(resume.personalInfo as string)
          : null,
        education: resume.education
          ? JSON.parse(resume.education as string)
          : null,
        workExperience: resume.workExperience
          ? JSON.parse(resume.workExperience as string)
          : null,
        qualification: resume.qualification
          ? JSON.parse(resume.qualification as string)
          : null,
      };
      return formattedResume;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getResumeFileByResumeId = async (resumeId: string | undefined) => {
  if (!resumeId || db.resumeFile === undefined) return null;
  try {
    const resumeFile = await db.resumeFile.findFirst({
      where: {
        resumeId,
      },
    });
    return resumeFile;
  } catch (error) {
    return null;
  }
};

export const updateOrCreateResumeFileByUserId = async (
  userId: string | undefined,
  resumeFile: ResumeFile,
  resumeId?: string
) => {
  if (!userId || db.user === undefined) return null;
  try {
    if (resumeFile.id) {
      const updatedResumeFile = await db.resumeFile.update({
        where: {
          id: resumeFile.id,
          userId,
        },
        data: {
          resumeId,
          file: resumeFile.file,
          fileType: resumeFile.fileType,
          fileName: resumeFile.fileName,
        },
      });

      if (resumeId) {
        await db.resume.update({
          where: {
            id: resumeId,
          },
          data: {
            resumeFileId: updatedResumeFile.id,
          },
        });
      }
      return updatedResumeFile;
    } else {
      const newResumeFile = await db.resumeFile.create({
        data: {
          userId,
          file: resumeFile.file,
          fileType: resumeFile.fileType,
          fileName: resumeFile.fileName,
        },
      });
      return newResumeFile;
    }
  } catch (error) {
    return null;
  }
};

export const updateOrCreateResumeByUserId = async (
  userId: string | undefined,
  resume: Resume,
  resumeFileId?: string
) => {
  if (!userId || db.user === undefined) return null;
  try {
    if (resume.id) {
      const updatedRes = await db.resume.update({
        where: {
          id: resume.id,
        },
        data: {
          userId,
          resumeFileId: resumeFileId || '',
          personalInfo: JSON.stringify(resume.personalInfo),
          education: JSON.stringify(resume.education),
          workExperience: JSON.stringify(resume.workExperience),
          qualification: JSON.stringify(resume.qualifications),
          skills: [],
        },
        select: {
          id: true,
          userId: true,
          resumeFileId: true,
          personalInfo: true,
          education: true,
          workExperience: true,
          qualification: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (resumeFileId) {
        await db.resumeFile.update({
          where: {
            id: resumeFileId,
          },
          data: {
            resumeId: updatedRes.id,
          },
        });
      }

      return {
        ...updatedRes,
        personalInfo: updatedRes.personalInfo
          ? JSON.parse(updatedRes.personalInfo as string)
          : null,
        education: updatedRes.education
          ? JSON.parse(updatedRes.education as string)
          : null,
        workExperience: updatedRes.workExperience
          ? JSON.parse(updatedRes.workExperience as string)
          : null,
        qualification: updatedRes.qualification
          ? JSON.parse(updatedRes.qualification as string)
          : null,
      };
    } else {
      const newResume = await db.resume.create({
        data: {
          userId,
          resumeFileId: resumeFileId || '',
          personalInfo: JSON.stringify(resume.personalInfo),
          education: JSON.stringify(resume.education),
          workExperience: JSON.stringify(resume.workExperience),
          qualification: JSON.stringify(resume.qualifications),
          skills: [],
        },
        select: {
          id: true,
          userId: true,
          resumeFileId: true,
          personalInfo: true,
          education: true,
          workExperience: true,
          qualification: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (resumeFileId) {
        await db.resumeFile.update({
          where: {
            id: resumeFileId,
          },
          data: {
            resumeId: newResume.id,
          },
        });
      }

      return {
        ...newResume,
        personalInfo: newResume.personalInfo
          ? JSON.parse(newResume.personalInfo as string)
          : null,
        education: newResume.education
          ? JSON.parse(newResume.education as string)
          : null,
        workExperience: newResume.workExperience
          ? JSON.parse(newResume.workExperience as string)
          : null,
        qualification: newResume.qualification
          ? JSON.parse(newResume.qualification as string)
          : null,
      };
    }
  } catch (error) {
    return null;
  }
};

export const postResumeFileToApi = async (formData: FormData) => {
  try {
    const response = await fetch('/api/resume/upload', {
      method: 'POST',
      body: formData,
    });

    const dataResponse = await response.json();
    return dataResponse;
  } catch (error) {
    return null;
  }
};
