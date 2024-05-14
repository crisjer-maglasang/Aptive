import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Select } from '@/components/common';
import { repTypeSelectOptions, usersManagementConstants } from '../../lib';

const ArchivedSelectType = ({ type }) => {
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const selectedType = event.target.value;
    navigate(`${selectedType === usersManagementConstants.ARCHIVED_USER_TYPE ? '/onboarding/users-management' : '/onboarding/leads-management'}`);
  };

  return (
    <div className="flex items-center justify-between">
      Archived
      <Select
        name="section"
        value={type}
        options={repTypeSelectOptions}
        defaultOption={repTypeSelectOptions[0]}
        onChange={handleSelectChange}
        className="ml-2"
      />
    </div>
  );
};

export default ArchivedSelectType;
