import { CloseIconButton, Select } from '@/components/common';
import CustomButton from '@/components/common/Button/CustomButton';
import { useKeyManagePopup } from '../../hooks/useKeyManagePopup';
import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectRegionals,
  requestRegionalsAsync,
  selectApprovalFiltersLoading,
} from '@/redux/approval';
import PropTypes from 'prop-types';
import { approvingUserRolesOptions } from '../../lib';
import { requestRecruitersAsync, selectRecruiters } from '@/redux/recruiters';
import { addFsExcludeClass } from '@/lib/utils';

const ApprovalFiltersPopup = memo(({ onClose, addFilter }) => {
  const popupId = 'approvalFilters';
  useKeyManagePopup(popupId, onClose);

  const dispatch = useDispatch();
  const recruiters = useSelector(selectRecruiters);
  const regionals = useSelector(selectRegionals);
  const isLoading = useSelector(selectApprovalFiltersLoading);

  const [filter, setFilter] = useState({
    userRole: '',
    userName: '',
    userId: '',
  });

  useEffect(() => {
    if (filter.userRole === 'regionals' && !regionals.length) {
      dispatch(requestRegionalsAsync.request());
    } else if (filter.userRole === 'recruiters' && !recruiters.length) {
      dispatch(requestRecruitersAsync.request());
    }
    setFilter({ ...filter, userId: '', userName: '' });
  }, [filter.userRole]);

  const getDropdownOptions = (userRole) => {
    const defaultOption = { value: '', label: 'Show all' };
    let options = [];

    if (userRole === 'regionals') {
      options = regionals;
    } else if (userRole === 'recruiters') {
      options = recruiters;
    }

    return [defaultOption, ...options];
  };

  const onSelectRole = useCallback((event) => {
    const { name, value } = event.target;

    setFilter({ ...filter, [name]: value });
  }, [filter]);

  const onSelectUser = useCallback((event) => {
    const { name, value } = event.target;
    const userName = getDropdownOptions(filter.userRole)
      .find((option) => option.value === value).label;

    setFilter({ ...filter, userName, [name]: value });
  }, [filter, getDropdownOptions]);

  const onSubmitFilters = (event) => {
    event.preventDefault();

    if (filter.userId) {
      addFilter(filter);
      onClose();
    }
  };

  const onCancelFilters = () => {
    setFilter({ ...filter, userId: '', userName: '', userRole: '' });
  };

  return (
    <div id={popupId} className="absolute right-0 -bottom-[150px] z-10 animate-fade-in">
      <form
        onSubmit={onSubmitFilters}
        className="flex flex-col bg-white shadow-popup rounded-lg"
      >
        <div className="py-4 px-6 flex justify-between items-center gap-x-14 border-b">
          <div className="flex justify-center items-center gap-x-2 text-sm text-gray-700">
            <Select
              name="userRole"
              value={filter.userRole}
              onChange={onSelectRole}
              className="w-[155px] text-sm"
              options={approvingUserRolesOptions}
            />
            <span className="font-medium whitespace-nowrap">Is filtered by</span>
            <Select
              name="userId"
              value={filter.userId}
              onChange={onSelectUser}
              className={addFsExcludeClass('w-[155px] text-sm')}
              options={getDropdownOptions(filter.userRole)}
              isLoading={isLoading}
              isDisabled={isLoading}
            />
          </div>
          <CloseIconButton
            onClose={onClose}
            classes="w-8 h-8 text-gray-400 hover:text-gray-500 focus:outline-aptivegreen"
          />
        </div>

        <div className="py-4 px-5 flex flex justify-end items-center gap-x-3">
          <CustomButton
            color="white"
            onClick={onCancelFilters}
            className="px-6 py-2 text-gray-700 font-normal border-0 shadow-none"
          >
            Cancel
          </CustomButton>
          <CustomButton
            type="submit"
            color="green"
            className="px-6 py-2 text-white font-normal"
          >
            Apply Filters
          </CustomButton>
        </div>
      </form>
    </div>
  );
});

ApprovalFiltersPopup.propTypes = {
  onClose: PropTypes.func,
  addFilter: PropTypes.func,
};

export default ApprovalFiltersPopup;
