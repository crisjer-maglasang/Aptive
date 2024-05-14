import PropTypes from 'prop-types';

import { CustomFormElement } from '@/components/common';

const EditEndOn = ({ value, ...props }) => (
  <CustomFormElement
    formValue={value}
    type="date"
    {...props}
  />
);

EditEndOn.propTypes = {
  value: PropTypes.any.isRequired,
};

export default EditEndOn;
