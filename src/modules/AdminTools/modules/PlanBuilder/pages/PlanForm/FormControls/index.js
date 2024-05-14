import PropTypes from 'prop-types';

import Reset from './Reset';
import Submit from './Submit';

const FormControls = ({ submitText }) => {
  return (
    <div className="flex flex-row space-x-4">
      <Reset />
      <Submit {...{ submitText }} />
    </div>
  );
};

FormControls.propTypes = {
  submitText: PropTypes.any,
};

export default FormControls;
