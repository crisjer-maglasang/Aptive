import PropTypes from 'prop-types';

import { CustomButton } from '@/components';

const AddButton = ({ children, onClick, shouldShow }) => {
  if (!shouldShow) {
    return null;
  }

  return (
    <div className="flex flex-row mt-4">
      <div className="flex-grow" />
      <CustomButton {...{ onClick }}>{children}</CustomButton>
    </div>
  );
};

AddButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  shouldShow: PropTypes.bool.isRequired,
};

export default AddButton;
