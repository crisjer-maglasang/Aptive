import PropTypes from 'prop-types';
import { Icon } from '@/components';

const SortableCell = ({ id, label, onClick, sortBy, isAscending }) => {
  const upArrow = 'sortUp';
  const downArrow = 'sortDown';
  const sortIcon = 'sort';

  const arrow = isAscending ? upArrow : downArrow;

  const icon = sortBy === id ? arrow : sortIcon;

  return (
    <div className="flex flex-row cursor-pointer" onClick={onClick}>
      <div>{label}</div>
      <div className="flex">
        <div className="flex-grow">
          <Icon icon={icon} className="w-4 h-4 text-gray-600 inline" />
        </div>
      </div>
    </div>
  );
};

SortableCell.propTypes = {
  id: PropTypes.string.isRequired,
  isAscending: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  sortBy: PropTypes.string,
};

export default SortableCell;
