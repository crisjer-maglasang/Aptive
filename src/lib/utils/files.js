import { base64StringToFile } from '@/lib';

export const prepareFileForRequest = (file, name) => {
  if (file?.name?.length > 0) {
    const formData = new FormData();

    formData.append(name, file);

    return formData;
  } else {
    return null;
  }
};

export const prepareSignatureImageForRequest = (image) => {
  if (image?.length > 0) {
    const fileName = 'signature.png';
    const signatureFile = base64StringToFile(image, fileName);
    const formData = new FormData();

    formData.append('signature_picture', signatureFile);

    return formData;
  } else {
    return null;
  }
};
