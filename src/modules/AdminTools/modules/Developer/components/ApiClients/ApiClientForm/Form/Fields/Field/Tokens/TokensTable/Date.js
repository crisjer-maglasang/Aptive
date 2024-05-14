import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';

import { formatDateDisplay } from '@/lib';
import { apiClientConstants } from '@/modules/AdminTools/lib/constants';

const { API_TOKENS } = apiClientConstants;

const Date = ({ index, field }) => {
  const name = `${API_TOKENS}[${index}].${field}`;

  const nameValue = useWatch({ name });

  return <>{formatDateDisplay(nameValue)}</>;
};

Date.propTypes = {
  index: PropTypes.number.isRequired,
  field: PropTypes.string.isRequired,
};

export default Date;
