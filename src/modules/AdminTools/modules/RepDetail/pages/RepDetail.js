import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import { useEffect } from 'react';

import { requestPlansAsync } from '@/modules/AdminTools/redux/planBuilder/plans';
import { requestAreaPlansAsync } from '@/modules/AdminTools/redux/planBuilder/area-plans';
import { requestSettingsAsync } from '@/modules/AdminTools/redux/planBuilder/settings';
import { requestAreasListAsync } from '@/redux/areas-new';
import {
  requestRepDetailsAsync,
  clearRepPlans,
} from '@/modules/AdminTools/redux/planBuilder/rep-details';
import { requestProductsAsync } from '@/modules/AdminTools/redux/productManager/products';
import { clearUsersSearch } from '@/redux/users';

const RepDetail = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearUsersSearch());
    dispatch(clearRepPlans());
    dispatch(requestPlansAsync.request());
    dispatch(requestAreaPlansAsync.request());
    dispatch(requestRepDetailsAsync.request());
    dispatch(requestSettingsAsync.request());
    dispatch(requestAreasListAsync.request());

    dispatch(requestProductsAsync.request());

    return () => {
      dispatch(clearUsersSearch());
      dispatch(clearRepPlans());
    };
  }, [dispatch]);

  return (
    <div className="m-6">
      <Outlet />
    </div>
  );
};

export default RepDetail;
