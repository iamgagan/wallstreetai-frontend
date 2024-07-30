export const fileToBase64String = async (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('Failed to convert file to base64 string');
      }
    };
    reader.onerror = () => {
      reject('Failed to convert file to base64 string');
    };
    reader.readAsDataURL(file);
  });
};

export const convertBas64StringToFile = async (
  base64String: string,
  fileName: string,
  fileType: string
) => {
  const response = await fetch(base64String);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: fileType });
  return file;
};

export const fileToByteArray = async (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const byteArray = new Uint8Array(event.target?.result as ArrayBuffer);
      resolve(byteArray.toString());
    };
    reader.onerror = () => {
      reject('Failed to convert file to base64 string');
    };
    reader.readAsArrayBuffer(file);
  });
};
