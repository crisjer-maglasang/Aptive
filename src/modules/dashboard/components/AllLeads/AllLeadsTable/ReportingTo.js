import { dashboardConstants } from '@/lib/constants';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';

const {
  PARTNERSHIP,
  REGIONAL_MANAGER,
  DIVISION_MANAGER,
  SENIOR_TEAM_LEADER,
} = dashboardConstants;

const ReportingTo = ({
  partnership,
  regionalManager,
  divisionManager,
  seniorTeamLeader,
  isOpened,
}) => {
  const hierarchy = [
    { label: PARTNERSHIP, value: partnership },
    { label: REGIONAL_MANAGER, value: regionalManager },
    { label: DIVISION_MANAGER, value: divisionManager },
    { label: SENIOR_TEAM_LEADER, value: seniorTeamLeader },
  ];

  const [shown, setShown] = useState(isOpened);

  const onShowHierarchyClick = () => {
    setShown(true);
  };

  return shown
    ? (
      <dl>
        {hierarchy.map(({ label, value }) => (
          <Fragment key={label}>
            <dt className="font-medium text-gray-900">
              {label}
            </dt>
            <dd className="pl-4 relative before:block before:absolute before:border-l before:border-b before:border-gray-500 before:w-[6px] before:h-[12px] before:-ml-[11px]">
              {value ?? '(n/a)'}
            </dd>
          </Fragment>
        ))}
      </dl>
    ) : (
      <button
        type="button"
        onClick={onShowHierarchyClick}
        className="text-primary-300 font-medium text-left cursor-pointer focus:outline-none"
      >
        Show Hierarchy
      </button>
    );
};

ReportingTo.defaultProps = {
  isOpened: false,
};

ReportingTo.propTypes = {
  isOpened: PropTypes.bool,
  partnership: PropTypes.string,
  regionalManager: PropTypes.string,
  divisionManager: PropTypes.string,
  seniorTeamLeader: PropTypes.string,
};

export default ReportingTo;
