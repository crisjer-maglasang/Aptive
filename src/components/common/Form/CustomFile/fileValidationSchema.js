import * as yup from 'yup';
import { getFileThresholds } from '@/lib/validations';

export const checkIfFileTypeAllowed = (file) => {
  const matchExpression = getFileThresholds('image').match;
  let isAllowed = true;

  if (file?.name) {
    isAllowed = matchExpression.test(file.name);
  }

  return isAllowed;
};

export const checkIfFileSizeAllowed = (file) => {
  const maxSize = getFileThresholds('image').size;
  const bytesSize = maxSize * Math.pow(1024, 2);
  let isAllowed = true;

  if (file?.size > bytesSize) {
    isAllowed = false;
  }

  return isAllowed;
};

export const fileValidationSchema = yup.mixed()
  .test(
    'isAllowedType',
    `File type is not supported. Please, provide a file with the correct type
    (${getFileThresholds('image').type.join(', ')}) and try again.`,
    checkIfFileTypeAllowed,
  )
  .test(
    'isAllowedSize',
    `File size is too large and exceeds ${getFileThresholds('image').size} Mbps.
    Please, reduce the size of the file and try again.`,
    checkIfFileSizeAllowed,
  )
  .nullable();
