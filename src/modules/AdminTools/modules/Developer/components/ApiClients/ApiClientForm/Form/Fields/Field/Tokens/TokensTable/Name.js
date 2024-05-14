import PropTypes from 'prop-types';
import { useFormContext, useWatch } from 'react-hook-form';

import { CustomFormElement } from '@/components';
import { apiClientConstants } from '@/modules/AdminTools/lib/constants';

const { ID, API_TOKENS, API_TOKEN_NAME } = apiClientConstants;

const Name = ({ index }) => {
  const getName = (field) => `${API_TOKENS}[${index}].${field}`;

  const name = getName(API_TOKEN_NAME);
  const id = getName(ID);

  const { register } = useFormContext();

  const shouldShowName = useWatch({ name: id });
  const nameValue = useWatch({ name });

  if (shouldShowName) {
    return <>{nameValue}</>;
  }

  return (
    <CustomFormElement {...{ register }} type="text" name={name} required />
  );
};

Name.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Name;
