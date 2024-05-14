import PropTypes from 'prop-types';
import { memo } from 'react';
import { Select } from '@/components/common';

const AgreementFilter = ({
  text,
  onAgreementChange,
  filters,
  disabled,
}) => {
  const agreementOptions = [
    { value: 'completed', label: 'Completed' },
    { value: 'converted to user', label: 'Converted to user' },
    { value: 'sent', label: 'Sent' },
    { value: 'holding', label: 'Holding' },
    { value: 'admin', label: 'Admin' },
    { value: 'regional', label: 'Regional' },
    { value: 'pending', label: 'Pending' },
    { value: 'manager', label: 'Manager' },
  ];

  return (
    <Select
      name="agreement_filter"
      value={filters}
      onChange={({ target: { value } }) => {
        onAgreementChange(value);
      }}
      options={agreementOptions}
      isMulti={true}
      closeMenuOnSelect={false}
      placeholder={text}
      className="mr-2.5"
      disabled={disabled}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          padding: '0.125rem',
        }),
      }}
    />
  );
};

AgreementFilter.propTypes = {
  text: PropTypes.string.isRequired,
  onAgreementChange: PropTypes.func,
};

export default memo(AgreementFilter);
