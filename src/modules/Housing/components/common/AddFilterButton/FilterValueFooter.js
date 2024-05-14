import Button from '../Button';
import PropTypes from 'prop-types';

const FilterValueFooter = ({onCancelClick, onApplyClick, isFilterValid}) => {
  return (
    <div className="w-full py-4 px-2 gap-2.5 inline-flex border-t justify-center">
        <Button className={"px-4 py-2 border border-gray-200 rounded-lg text-xs"} color={"white"} onClick={onCancelClick}>Cancel</Button>
        <Button className={"px-5 py-2 rounded-lg text-xs"} color={"blue"} onClick={onApplyClick} disabled={!isFilterValid}>Apply</Button>
    </div>
  )
}

FilterValueFooter.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onApplyClick: PropTypes.func.isRequired,
  isFilterValid: PropTypes.bool.isRequired,
};

export default FilterValueFooter;
