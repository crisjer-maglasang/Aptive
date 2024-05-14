export function fileAcceptValidation (fileName, fileSize) {
  let result = {};
  const countDot = fileName.split('.').length - 1;
  if (countDot === 1) {
    const extArray = fileName.split('.');
    const ext = extArray[extArray.length-1];
    if (['xlsx', 'xls', 'doc', 'docx', 'pdf', 'jpg', 'png', 'heic', 'jpeg', 'txt'].includes(ext)) {
      result = {
        status: true,
        msg: '',
      };
    } else {
      result = {
        status: false,
        msg: 'File Format does not supported.',
      };
    }
    if (Math.round(fileSize / 1048576) < 15) {
      result = {
        status: true,
        msg: '',
      };
    } else {
      result = {
        status: false,
        msg: 'File size must be below 15 MB.',
      };
    }
  } else {
    result = {
      status: false,
      msg: 'Check file name. It should contain one dot and no space.',
    };
  }

  return result;
}
