import fetch from 'node-fetch';
import { v2 as cloudinary } from 'cloudinary';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string;
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET as string;

/**
 * Uploads a file to cloudinary and returns the url
 * Change this to S3 once it's ready
 * @params file is a byteArray string
 */
export const getFileUrl = async (file: string) => {
  try {
    const res = await cloudinary.uploader.unsigned_upload(file, UPLOAD_PRESET, {
      cloud_name: CLOUD_NAME,
      resource_type: 'auto',
    });
    const result = await res.json();
    console.log('result', result);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
