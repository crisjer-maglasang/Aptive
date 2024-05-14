import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router';

import {
  planSelector,
  requestPlanAsync,
  requestPlansAsync,
} from '@/modules/AdminTools/redux/planBuilder/plans';
import { requestSettingsAsync } from '@/modules/AdminTools/redux/planBuilder/settings';
import { requestAreasListAsync } from '@/redux/areas-new';
import { requestProductsAsync } from '@/modules/AdminTools/redux/productManager/products';
import { requestCategoriesAsync } from '@/modules/AdminTools/redux/productManager/product-categories';
import { requestSubCategoriesAsync } from '@/modules/AdminTools/redux/productManager/products-sub-categories';
import { requestBillingFrequenciesAsync } from '@/modules/AdminTools/redux/planBuilder/area-plans';

const PlanBuilder = () => {
  const dispatch = useDispatch();
  const urlParams = useParams();
  const plan = useSelector(planSelector);

  useEffect(() => {
    dispatch(requestPlansAsync.request());
    dispatch(requestSettingsAsync.request());
    dispatch(requestProductsAsync.request());
    dispatch(requestCategoriesAsync.request());
    dispatch(requestSubCategoriesAsync.request());
    dispatch(requestAreasListAsync.request());
    dispatch(requestBillingFrequenciesAsync.request());
  }, [dispatch]);

  useEffect(() => {
    const id = urlParams?.id;
    if (id && +id !== +plan.id) {
      dispatch(requestPlanAsync.request({ id }));
    }
  }, [dispatch, urlParams, plan]);

  return <Outlet />;
};

export default PlanBuilder;
