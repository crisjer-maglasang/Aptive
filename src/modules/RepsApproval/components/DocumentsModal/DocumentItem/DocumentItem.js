import { memo, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { CheckCircleIcon, PencilAltIcon, XCircleIcon } from '@heroicons/react/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/solid';
import { IconButton, Select } from '@/components/common';
import { mergeClassName, removeFieldsFromObject } from '@/lib/utils';
import { ApprovalContext } from '../../../providers';
import { DOCUMENT_STATUS } from '../../../lib';
import { DOCUMENTS } from '@/lib/constants';

const { PENDING, REJECTED, APPROVED } = DOCUMENT_STATUS;

export const DocumentItem = ({ ...documentItemProps }) => {
  const { id, status, documentType } = documentItemProps;
  const { document, toggleDeclineModal, setDocument, updateDocuments } = useContext(ApprovalContext);

  const [isEditMode, setIsEditMode] = useState(false);

  const onToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const onSelectDocument = () => {
    if (document.id !== id) {
      setDocument({ ...documentItemProps });
    }
  };

  const onSelectStatus = (event) => {
    const selectedStatus = event.target.value;

    if (selectedStatus === REJECTED) {
      toggleDeclineModal();
    } else if (selectedStatus === APPROVED || selectedStatus === PENDING) {
      const updatedData = removeFieldsFromObject({ ...document, status: selectedStatus }, ['reason', 'description']);

      updateDocuments(updatedData);
    }

    onToggleEditMode();
  };

  const getStatusMark = (status = PENDING) => {
    const marks = {
      pending: <CheckCircleIcon className="w-6 h-6 stroke-gray-400 group-hover:stroke-gray-700" />,
      approved: <CheckCircleIconSolid className="w-6 h-6 fill-primary-400" />,
      rejected: <XCircleIcon className="w-6 h-6 stroke-aptivered" />,
    };

    return marks[status];
  };

  return (
    <li
      role="button"
      onClick={onSelectDocument}
      className={mergeClassName(
        'w-full mb-1 group px-3 py-2 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-all duration-200 focus:bg-gray-100',
        {
          'bg-gray-100': (id === document?.id) && status !== REJECTED,
          'bg-red-100': (id === document?.id) && status === REJECTED,
          'hover:bg-red-100': status === REJECTED,
        },
      )}
    >
      <div className="flex items-center gap-x-3">
        {getStatusMark(status)}
        <p className="text-sm text-gray-900 font-medium">{DOCUMENTS[documentType]}</p>
      </div>
      {isEditMode ? (
        <Select
          name="approval"
          value={status}
          onChange={onSelectStatus}
          className="w-25 text-sm"
          options={[
            { value: PENDING, label: 'Select' },
            { value: APPROVED, label: status === APPROVED ? 'Approved' : 'Approve' },
            { value: REJECTED, label: status === REJECTED ? 'Declined' : 'Decline' },
          ]}
        />
      ) : (
        <IconButton actionTitle="Change document status" onClick={onToggleEditMode}>
          <PencilAltIcon className="w-6 h-6 stroke-gray-400 group-hover:stroke-gray-700" />
        </IconButton>
      )}
    </li>
  );
};

DocumentItem.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  documentType: PropTypes.string,
  status: PropTypes.string,
  ssnNumber: PropTypes.string,
  driverLicenseExpireDate: PropTypes.string,
  driverLicenseNumber: PropTypes.string,
};

export default memo(DocumentItem);
