import { db } from "@/lib/db";
import { Resume, ResumeFile } from "@/types/Resume";

export const getResumesByEmail = async (email: string | undefined) => {
  if (!email || db.user === undefined) return null;
  try {
    const resumes = await db.user.findUnique({
      where: {
        email,
        },
      select: {
        resumes: true,
        }
    });
      if (resumes?.resumes) {
          return resumes.resumes.sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate());
      } else {
          return null;
      }
  } catch (error) {
    return null;
  }
};

export const getResumesByUserId = async (userId:string | undefined) => {
  if (!userId || db.user === undefined) return null;
  try {
    const resumes = await db.resume.findMany({
      where: {
        userId,
      },
    });

    if (resumes) {
        return resumes.sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate());
    } else {
        return null;
    }
  } catch (error) {
    return null;
  }
}

export const getResumeFilesByEmail = async (email: string | undefined) => {
    if (!email || db.user === undefined) return null;
    try {
        const resumeFiles = await db.user.findUnique({
        where: {
            email,
            },
        select: {
            resumeFiles: true,
            }
        });

        if (resumeFiles?.resumeFiles) {
            return resumeFiles.resumeFiles.sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate());
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};
  
export const getResumeFilesByUserId = async (userId:string | undefined) => {
    if (!userId || db.user === undefined) return null;
    try {
        const resumeFiles = await db.resumeFile.findMany({
        where: {
            userId,
        },
        });
    if (resumeFiles) {
        return resumeFiles.sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate());
    } else {
        return null;
    }
        
    } catch (error) {
        return null;
    }
}

export const getResumeByResumeFileId = async (resumeFileId: string | undefined) => {
    if (!resumeFileId || db.resume === undefined) return null;
    try {
        const resume = await db.resume.findFirst({
            where: {
                resumeFileId,
            },
        });
        return resume;
    } catch (error) {
        return null;
    }
}

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
}

export const updateOrCreateResumeFileByUserId = async (userId: string | undefined, resumeFile: ResumeFile, resumeId?: string) => {
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

}

export const updateOrCreateResumeByUserId = async (userId: string | undefined, resume: Resume, resumeFileId?:string ) => {
    if (!userId || db.user === undefined) return null;
    try {
        if (resume.id) {
            const resumeFile = await db.resumeFile.findFirst({
                where: {
                    resumeId: resume.id,
                },
            });
            
            const updatedResume = await db.resume.update({
                where: {
                    id: resume.id,
                },
                data: {
                    personalInfo: {
                        create: {
                            resumeId: resume.id,
                            ...resume.personalInfo,
                        },
                    },
                    resumeFileId: resumeFileId || resumeFile?.id,
                    education: {
                        create: resume.education,
                    },
                    workExperience: {
                        create: resume.workExperience,
                    },
                    qualification: {
                        create: resume.qualification,
                    },
                    skills: resume.skills,
                },
            });
            return updatedResume;
        } else {
            const newResume = await db.resume.create({
                data: {
                    userId,
                    resumeFileId: resumeFileId,
                    education: {
                        create: resume.education,
                    },
                    workExperience: {
                        create: resume.workExperience,
                    },
                    qualification: {
                        create: resume.qualification,
                    },
                    skills: resume.skills,
                },
            });
            
            await db.personalInfo.create({
                data: {
                    resumeId: newResume.id,
                    ...resume.personalInfo,
                },
            });
            
            return newResume;
        }
        
    } catch (error) {
        return null;
    }
}