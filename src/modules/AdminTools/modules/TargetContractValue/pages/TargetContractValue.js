import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import { useEffect } from 'react';

import { requestTargetContractValuesAsync } from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/target-contract-values';
import { requestAreasListAsync } from '@/redux/areas-new';

const TargetContractValue = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestTargetContractValuesAsync.request());
    dispatch(requestAreasListAsync.request());
  }, [dispatch]);

  return (
    <div className="m-6">
      <Outlet />
    </div>
  );
};

export default TargetContractValue;
