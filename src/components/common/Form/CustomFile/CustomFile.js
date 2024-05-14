import { useMemo } from 'react';
import classNames from 'classnames';
import { UploadIcon } from '@heroicons/react/outline';
import { CustomButtonGroup, Loader } from '@/components/common';

const CustomFile = ({
  inputFileName,
  inputFileId,
  id,
  name,
  url,
  localFile,
  fileType,
  register,
  wrapperClassName,
  onChange,
  isFileLoading,
  onSaveClick,
  onCancelClick,
  disabled,
  acceptTypes,
  dontShowActions,
}) => {
  const wrapperClasses = useMemo(() => classNames(
    wrapperClassName,
    `flex flex-col items-center w-full px-4 py-6 my-1 text-sm font-medium tracking-wide uppercase
    transition-all duration-150 ease-linear border rounded-md shadow-md
    bg-aptivegreen border-blue text-aptivegreen-600`,
    !disabled ? 'cursor-pointer hover:bg-aptivegreen-600 hover:text-white' : '',
  ), [wrapperClassName, disabled]);

  const displayText = useMemo(() => {
    const fileUrlIsSetInDB = url?.length > 0;
    const localFileSelected = localFile?.name?.length > 0;

    if (localFileSelected) {
      return localFile?.name;
    } else if (fileUrlIsSetInDB) {
      return url;
    }
  }, [url, localFile]);

  const fileTypes = acceptTypes?.length
    ? acceptTypes.map((format) => `${fileType}/${format}`).join(',')
    : `${fileType}/*`;

  const showActions = useMemo(() => {
    return !dontShowActions && localFile?.name?.length > 0 && !isFileLoading;
  }, [dontShowActions, isFileLoading, localFile]);

  return (
    <>
      <label htmlFor={inputFileId} className={wrapperClasses}>
        {(url?.length > 0 || localFile?.name?.length > 0) && isFileLoading ? (
          <Loader color="#ffffff" />
        ) : (
          <>
            <UploadIcon className="w-8 h-8" />
            <input
              {...register(inputFileName)}
              name={inputFileName}
              id={inputFileName}
              type="file"
              className="hidden"
              accept={fileType ? fileTypes : ''}
              onChange={onChange}
              disabled={disabled}
            />
            <input
              {...register(name)}
              name={name}
              id={id}
              value={url || ''}
              type="hidden"
            />
            {url?.length > 0 || localFile?.name?.length > 0 ? (
              <span className="h-12 flex items-center">{displayText}</span>
            ) : (
              <span>Select a file</span>
            )}
          </>
        )}
      </label>
      {isFileLoading && (
        <div className="flex text-sm font-medium text-green-700 mt-4">
          Uploading Image
        </div>
      )}
      {showActions && (
        <CustomButtonGroup
          saveText="Upload"
          cancelText="Cancel"
          onSaveClick={onSaveClick}
          onCancelClick={() => onCancelClick(inputFileName)}
        />
      )}
    </>
  );
};

export default CustomFile;
