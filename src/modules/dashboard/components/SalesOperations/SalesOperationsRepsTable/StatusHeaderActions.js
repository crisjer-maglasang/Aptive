import { memo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, StatusDropdown } from './Values';

const StatusHeaderActions = ({
  isChecked,
  isIndeterminate,
  onCheckReps,
  onChangeStatus,
  isLoading,
  repStatuses,
  repsToChangeStatus,
}) => {
  return (
    <div className="relative flex items-center justify-between">
      <Checkbox
        onChange={onCheckReps}
        isChecked={isChecked}
        isIndeterminate={isIndeterminate}
        isLoading={isLoading}
      />
      {(isChecked || isIndeterminate )
        && <StatusDropdown onChange={onChangeStatus}
                           isDisabled={isLoading}
                           repStatuses={repStatuses}
                           repsToChangeStatus={repsToChangeStatus} />}
    </div>
  );
};

StatusHeaderActions.propTypes = {
  isChecked: PropTypes.bool,
  isIndeterminate: PropTypes.bool,
  isLoading: PropTypes.bool,
  onCheckReps: PropTypes.func,
  onChangeStatus: PropTypes.func,
  repStatuses: PropTypes.arrayOf(PropTypes.object),
  repsToChangeStatus: PropTypes.array,
  setRepsToChangeStatus: PropTypes.func,
};

export default memo(StatusHeaderActions);
