import PropTypes from 'prop-types';
import { plansSelector } from '@/modules/AdminTools/redux/planBuilder/plans';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

const PlanName = ({ planId }) => {
  const plans = useSelector(plansSelector);

  const getPlanName = useCallback(
    (planId) => {
      if (!planId || !plans) {
        return '';
      }

      const plan = plans.find(({ id }) => id === planId);

      if (!plan) {
        return '';
      }

      return plan.name;
    },
    [plans]
  );

  return <div>{getPlanName(planId)}</div>;
};

PlanName.propTypes = {
  planId: PropTypes.number,
};

export default PlanName;
