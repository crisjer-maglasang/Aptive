export const getFileThresholds = (fileType) => {
  if (fileType === 'image') {
    return {
      type: ['jpeg', 'png', 'heic'],
      match: /\S+(.*?).(jpg|jpeg|png|heic)$/i,
      size: 25, // MB size
    };
  }
};

const baseUnit = 1024;
const sizeLabels = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const formatBytes = (bytes, decimalPlaces = 0) => {
  let sizeLabel = '';
  let sizeValue = bytes;

  if (bytes === 0) {
    sizeLabel = 'Bytes';
  } else if (bytes === 1) {
    sizeLabel = 'Byte';
  } else {
    const exponent = Math.floor(Math.log(bytes) / Math.log(baseUnit));

    sizeValue = bytes / Math.pow(baseUnit, exponent);

    sizeLabel = sizeLabels[exponent];
  }

  return `${sizeValue.toFixed(decimalPlaces)} ${sizeLabel}`;
};
