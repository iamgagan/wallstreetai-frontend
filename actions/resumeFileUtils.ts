import { FileUpload } from '@/lib/uploadAws';

export async function extractRequestInfo(formData: FormData) {
  const file = formData.getAll('file') as File[];
  const resumeFile = file[0] as File;
  const fileName = resumeFile.name;
  const fileType = resumeFile.type;
  const userId = formData.get('userId') as string;

  return { file, resumeFile, fileName, fileType, userId };
}

export async function uploadToAws(
  userId: string,
  resumeFile: File,
  resumeFileId?: string
) {
  const fileUpload = new FileUpload();
  try {
    const response: any = await fileUpload.uploadAws(
      userId,
      resumeFile,
      resumeFileId
    );
    return { awsUrl: response.awsUrl || null };
  } catch (error) {
    console.error('Error uploading to AWS:', error);
    throw new Error('Failed to upload file to AWS');
  }
}
