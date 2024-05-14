import PropTypes from 'prop-types';

import { CustomFormElement } from '@/components/common';

const EditStartOn = ({ value, ...props }) => (
  <CustomFormElement formValue={value} type="date" {...props} required />
);

EditStartOn.propTypes = {
  value: PropTypes.any.isRequired,
};

export default EditStartOn;
