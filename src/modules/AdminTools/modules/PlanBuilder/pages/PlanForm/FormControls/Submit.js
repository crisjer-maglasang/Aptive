import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { CustomButton } from '@/components';
import { updatingPlanLoadingSelector } from '@/redux/loading';

const Submit = ({ submitText }) => {
  const isUpdating = useSelector(updatingPlanLoadingSelector);

  return (
    <CustomButton color={'green'} disabled={isUpdating} type="submit">
      {submitText}
    </CustomButton>
  );
};

Submit.propTypes = {
  submitText: PropTypes.string.isRequired,
};

export default Submit;
