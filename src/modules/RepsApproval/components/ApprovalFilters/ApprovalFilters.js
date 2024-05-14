import { memo, useCallback, useState } from 'react';
import CustomButton from '@/components/common/Button/CustomButton';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { FilterBadge } from '@/components/common';
import { getAddFilterButtonLabel, getFilteredUsersId } from '../../lib';
import ApprovalFiltersPopup from '../ApprovalFiltersPopup/ApprovalFiltersPopup';
import { addFsExcludeClass, mergeClassName } from '@/lib/utils';
import PropTypes from 'prop-types';

const ApprovalFilters = memo(({ setFilters }) => {
  const [isPopupOpened, setPopupOpened] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const onTogglePopup = useCallback(() => {
    setPopupOpened(!isPopupOpened);
  }, [isPopupOpened]);

  const onAddFilter = useCallback((newFilter) => {
    const filterIndex = selectedFilters
      .findIndex(({ userRole, userId }) =>
        newFilter.userRole === userRole && newFilter.userId === userId);

    if (filterIndex < 0) {
      const filters = [...selectedFilters, newFilter];
      const users = getFilteredUsersId(filters, newFilter);

      setSelectedFilters(filters);
      setFilters({ userRole: newFilter.userRole, users });
    }
  }, [selectedFilters, setFilters]);

  const onDeleteFilter = (filterToDelete) => () => {
    const filters = selectedFilters
      .filter(({ userId, userRole }) =>
        (userId !== filterToDelete.userId) || (userRole !== filterToDelete.userRole));
    const users = getFilteredUsersId(filters, filterToDelete);

    setSelectedFilters(filters);
    setFilters({ userRole: filterToDelete.userRole, users });
  };

  return (
    <div
      className={mergeClassName(
        'flex gap-x-4 items-center mb-0.5',
        { 'items-end': selectedFilters.length > 1 },
      )}
    >
      <div className="flex flex-wrap justify-end gap-y-3 gap-x-3">
        {selectedFilters.length ? selectedFilters?.map((filter) => {
          const label = getAddFilterButtonLabel(filter.userRole);

          return (
            <FilterBadge
              key={`${filter.userRole}-${filter.userId}`}
              text={`${label}: ${filter.userName}`}
              onDelete={onDeleteFilter(filter)}
              className={addFsExcludeClass()}
            />
          );
        }) : null}
      </div>
      <CustomButton
        onClick={onTogglePopup}
        className="whitespace-nowrap flex justify-between items-center gap-x-3 py-1.5 px-4 rounded border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300"
      >
        <PlusCircleIcon className="w-6 h-6 text-gray-400" />
        <span className="text-xs text-gray-700">
          {selectedFilters.length
            ? getAddFilterButtonLabel(selectedFilters[selectedFilters.length - 1].userRole)
            : 'Filter by'}
        </span>
      </CustomButton>
      {isPopupOpened ? (
        <ApprovalFiltersPopup onClose={onTogglePopup} addFilter={onAddFilter} />
      ) : null}
    </div>
  );
});

ApprovalFilters.propTypes = {
  setFilters: PropTypes.func,
};

export default ApprovalFilters;
