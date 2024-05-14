import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import { CustomFormElement } from '@/components/common';

const Date = ({ name, ...props }) => (
  <Controller
    name={name}
    render={({ field: { onChange, onBlur, value } }) => (
      <CustomFormElement
        type="date"
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        formValue={value}
        {...props}
      />
    )}
  />
);

Date.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Date;
