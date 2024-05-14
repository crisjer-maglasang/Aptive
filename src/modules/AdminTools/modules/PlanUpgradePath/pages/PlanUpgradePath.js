import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import { useEffect } from 'react';

import { requestPlansAsync } from '@/modules/AdminTools/redux/planBuilder/plans';
import { requestPlanUpgradePathsAsync } from '@/modules/AdminTools/redux/planBuilder/plan-upgrade-paths';
import { requestPlanCategoriesAsync } from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/plan-categories';

const PlanUpgradePath = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestPlansAsync.request());
    dispatch(requestPlanCategoriesAsync.request());

    dispatch(requestPlanUpgradePathsAsync.request());
  }, [dispatch]);

  return (
    <div className="m-6">
      <Outlet />
    </div>
  );
};

export default PlanUpgradePath;
