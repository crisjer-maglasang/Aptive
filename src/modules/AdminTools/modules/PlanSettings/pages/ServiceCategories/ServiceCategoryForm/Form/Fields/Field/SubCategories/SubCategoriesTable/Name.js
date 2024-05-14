import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import { CustomFormElement } from '@/components';

const { NAME, PRODUCT_SUB_CATEGORIES } = productManagerConstants;

const Name = ({ index }) => {
  const name = `${PRODUCT_SUB_CATEGORIES}[${index}].${NAME}`;

  const { register } = useFormContext();

  return (
    <CustomFormElement {...{ register }} type="text" name={name} required />
  );
};

Name.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Name;
