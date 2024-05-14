import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Tabs from '@/modules/AdminTools/components/Tabs';
import {
  clearPlanBuilderApiTokens,
  requestPlanBuilderApiClientsAsync,
} from '@/modules/AdminTools/redux/planBuilder/api-clients';
import { planDeveloperRoutes } from '@/modules/AdminTools/routing/developer';

const Settings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestPlanBuilderApiClientsAsync.request());

    return () => {
      dispatch(clearPlanBuilderApiTokens.request());
    };
  }, [dispatch]);

  const links = planDeveloperRoutes.map((route) => ({
    to: route.path,
    text: route.name,
  }));

  return <Tabs links={links} />;
};

export default Settings;
