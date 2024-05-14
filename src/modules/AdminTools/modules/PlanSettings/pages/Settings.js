import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { requestPlanPricingLevelsAsync } from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/plan-pricing-levels';
import Tabs from '@/modules/AdminTools/components/Tabs';
import { planSettingsRoutes } from '@/modules/AdminTools/routing/settings';
import {
  requestAgreementLengthsAsync,
  requestAgreementLengthUnitsAsync,
} from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/agreement-lengths';
import { requestPlanCategoriesAsync } from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/plan-categories';
import { requestPlanStatusesAsync } from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/plan-statuses';
import { requestPlanServiceFrequenciesAsync } from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/plan-service-frequencies';
import { requestCategoriesAsync } from '@/modules/AdminTools/redux/productManager/product-categories';
import { requestPlanCanSellTotalsThresholdAsync } from '@/modules/AdminTools/redux/planBuilder/plan-can-sell-totals-threshold';

const Settings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestPlanCanSellTotalsThresholdAsync.request());
    dispatch(requestPlanPricingLevelsAsync.request());
    dispatch(requestPlanServiceFrequenciesAsync.request());
    dispatch(requestPlanStatusesAsync.request());
    dispatch(requestPlanCategoriesAsync.request());
    dispatch(requestAgreementLengthsAsync.request());
    dispatch(requestAgreementLengthUnitsAsync.request());
    dispatch(requestCategoriesAsync.request(true));
  }, [dispatch]);

  const links = planSettingsRoutes.map((route) => ({
    to: route.path,
    text: route.name,
  }));

  return <Tabs links={links} />;
};

export default Settings;
