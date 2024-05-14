import { mergeClassName } from '@/lib/utils';
import PropTypes from 'prop-types';

const AddApartmentButton = ({ onClick, className }) => {
  return (
    <button
      className={mergeClassName(className, 'text-left cursor-pointer focus:outline-none')}
      onClick={() => onClick()}
    >
      Add Apartment
    </button>
  );
};

AddApartmentButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default AddApartmentButton;
