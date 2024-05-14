import { dashboardConstants, mergeClassName } from '@/lib';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { memo } from 'react';
import PropTypes from 'prop-types';

const { ASC_ORDER, DESC_ORDER } = dashboardConstants;

const SortLabel = ({
  isDisabled,
  children,
  position,
  sortName,
  sortOrder,
  selectedSortName,
  className,
  onSortChange,
}) => {
  const sortStyles = 'w-4 h-4 stroke-gray-400';

  const onSortClick = () => {
    let order;

    if (selectedSortName) {
      order = selectedSortName === sortName && sortOrder === ASC_ORDER ? DESC_ORDER : ASC_ORDER;
    } else {
      order = !sortOrder
        ? ASC_ORDER
        : sortOrder === ASC_ORDER ? DESC_ORDER : null;
    }

    onSortChange({ name: sortName, order });
  };

  const isSelectedOrder = (order) => {
    return selectedSortName
      ? selectedSortName === sortName && sortOrder === order
      : sortOrder === order;
  };

  return (
    <button
      type="button"
      onClick={onSortClick}
      disabled={isDisabled}
      className={mergeClassName('uppercase flex items-center relative', className)}
    >
      {children}
      <span className="ml-1.5 flex flex-col">
        <ChevronUpIcon
          className={mergeClassName(
            sortStyles,
            { 'stroke-black': isSelectedOrder(ASC_ORDER) },
          )}
        />
        <ChevronDownIcon
          className={mergeClassName(
            sortStyles,
            { 'stroke-black': isSelectedOrder(DESC_ORDER) },
          )}
        />
      </span>
      {position ? (
        <span className="absolute left-[92%] flex w-5 h-5 justify-center items-center ml-2 bg-gray-200 text-black rounded-full">
          {position}
        </span>
      ) : null}
    </button>
  );
};

SortLabel.propTypes = {
  isDisabled: PropTypes.bool,
  children: PropTypes.string,
  className: PropTypes.string,
  position: PropTypes.number,
  sortOrder: PropTypes.string,
  sortName: PropTypes.string,
  selectedSortName: PropTypes.string,
  onSortChange: PropTypes.func,
};

export default memo(SortLabel);
