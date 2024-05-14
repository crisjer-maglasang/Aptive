import { useContext } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { IconButton } from '@/components/common';
import { ApprovalContext } from '../../providers';
import { DOCUMENTS, onboardingConstants } from '@/lib/constants';
import { addFsExcludeClass } from '@/lib/utils';

const {
  PASSPORT_EXPIRATION_DATE_LABEL,
  DRIVER_LICENSE_EXPIRATION_DATE_LABEL,
  DRIVER_LICENSE_NUMBER_LABEL,
  SSN_LABEL,
} = onboardingConstants;

const ImageModal = () => {
  const { document, toggleViewImage } = useContext(ApprovalContext);
  const { documentType, passportExpireDate, driverLicenseNumber, driverLicenseExpireDate, ssnNumber, image } = document;

  const renderDocumentData = (data, title) => {
    return data ? (
      <div className="flex items-center mb-0.5 text-sm">
        <p className="mr-2 text-aptivegreen">{title}</p>
        <p className={addFsExcludeClass()}>{data}</p>
      </div>
    ) : null;
  };

  return (
    <div className="p-2 min-w-[350px] min-h-[200px]">
      <div className="flex items-center justify-between gap-x-3">
        <h1>{DOCUMENTS[documentType]}</h1>
        <IconButton
          actionTitle="Close image model"
          onClick={toggleViewImage}
          className="text-gray-500 hover:text-gray-900"
        >
          <XIcon className="w-6 h-6" aria-hidden="true" />
        </IconButton>
      </div>
      <div className="mb-1">
        {renderDocumentData(passportExpireDate, PASSPORT_EXPIRATION_DATE_LABEL)}
        {renderDocumentData(driverLicenseNumber, DRIVER_LICENSE_NUMBER_LABEL)}
        {renderDocumentData(driverLicenseExpireDate, DRIVER_LICENSE_EXPIRATION_DATE_LABEL)}
        {renderDocumentData(ssnNumber, SSN_LABEL)}
      </div>
      <div className="flex items-center justify-center">
        <img src={image} alt={DOCUMENTS[documentType]} className={addFsExcludeClass('w-full h-auto')} />
      </div>
    </div>
  );
};

export default ImageModal;
