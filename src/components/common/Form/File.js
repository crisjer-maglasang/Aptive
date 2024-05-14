import { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { UploadIcon } from '@heroicons/react/outline';
import { ButtonGroup } from '..';
import { FormLabel } from '.';
import { Loader } from '../';
import { validateFileUpload } from '../../../lib/validations';
const File = ({
  id,
  name,
  userId,
  upload,
  errors,
  loading,
  fileUrl,
  fileName,
  fileType,
  dispatch,
  filePropertyName,
  wrapperClassName,
}) => {
  const wrapperClasses = classNames(
    wrapperClassName,
    'flex flex-col items-center w-full px-4 py-6 my-1 text-sm font-medium tracking-wide uppercase transition-all duration-150 ease-linear border rounded-md shadow-md cursor-pointer bg-aptivegreen border-blue hover:bg-aptivegreen-600 hover:text-white text-aptivegreen-600'
  );
  const [localFileData, setLocalFileData] = useState();
  const errorMessageMap = {
    image: {
      size: 'Please select a file smaller than 5 MB',
      invalidType: 'Please select a valid image file',
    },
  };

  const handleChange = (e) => {
    const validated = validateFileUpload(fileType, e.target.files[0]);
    if (typeof validated === 'boolean') {
      setLocalFileData(e.target.files[0]);
      dispatch(e.target.files[0].name, []);
    } else {
      dispatch('', [errorMessageMap[fileType][validated]]);
    }
  };

  const handleClick = (e, index) => {
    if (index === 0) {
      const formData = new FormData();
      formData.append('user', JSON.stringify({ user_id: userId }));
      formData.append(filePropertyName, localFileData);
      upload(formData);
      dispatch(localFileData.name, errors ? [...errors] : []);
    } else {
      setLocalFileData();
    }
  };

  const fileUrlIsSetInDB = fileUrl?.length > 0;
  const fileNameIsSetInDB = fileName?.length > 0;
  const componentStateFileName = localFileData?.name;

  const generateDisplayText = () => {
    if (fileUrlIsSetInDB) {
      return fileUrl;
    } else if (fileNameIsSetInDB) {
      return fileName;
    } else {
      return componentStateFileName;
    }
  };

  return (
    <>
      <label htmlFor={id} className={wrapperClasses}>
        {fileUrlIsSetInDB || fileNameIsSetInDB || componentStateFileName ? (
          loading ? (
            <Loader color="#ffffff" />
          ) : (
            <span>{generateDisplayText()}</span>
          )
        ) : (
          <>
            <UploadIcon className="w-8 h-8" />
            <input
              name={name}
              id={id}
              type="file"
              className="hidden"
              accept={fileType ? `${fileType}/*` : ''}
              onChange={handleChange}
            />
            <span>Select a file</span>
          </>
        )}
      </label>
      {loading && <FormLabel label={loading} htmlFor={id} isSuccess />}
      {componentStateFileName && !fileNameIsSetInDB && !loading && (
        <ButtonGroup
          wrapperClassName={classNames({ 'mt-3': !loading })}
          buttons={['Upload', 'Cancel']}
          onClick={handleClick}
        />
      )}
    </>
  );
};

File.propTypes = {
  userId: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  upload: PropTypes.func.isRequired,
  fileType: PropTypes.string.isRequired,
  loading: PropTypes.string.isRequired,
  filePropertyName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  error: PropTypes.string,
  fileUrl: PropTypes.string,
  fileName: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

File.defaultProps = {
  name: '',
  error: '',
  fileUrl: '',
  fileName: '',
  wrapperClassName: '',
};

export default File;
