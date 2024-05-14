import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useWatch } from 'react-hook-form';

import AreaPlan from './AreaPlan';
import AreaPlanOptions from './AreaPlanOptions';

const AreaPlans = ({ areaIndex, setAreaIndex, Headers }) => {
  const name = 'area_plans';
  const areaPlans = useWatch({ name });

  return (
    <>
      <AreaPlanOptions {...{ areaIndex, setAreaIndex }} />
      {areaPlans.map((_i, index) => (
        <Fragment key={index}>
          {+areaIndex === +index && (
            <AreaPlan name={`${name}[${index}]`} {...Headers} />
          )}
        </Fragment>
      ))}
    </>
  );
};

AreaPlans.propTypes = {
  Headers: PropTypes.any.isRequired,
  areaIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setAreaIndex: PropTypes.func.isRequired,
};

export default AreaPlans;
