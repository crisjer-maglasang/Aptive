import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Tabs from '@/modules/AdminTools/components/Tabs';
import { promoCodesRoutes } from '@/modules/AdminTools/routing/promo-code';
import {
  requestPromotionTypesAsync,
  requestPromotionsAsync,
} from '@/modules/AdminTools/redux/promoCode/promotions';
import {
  requestCampaignChannelsAsync,
  requestCampaignsAsync,
} from '@/modules/AdminTools/redux/promoCode/campaigns';
import { requestPlansAsync } from '@/modules/AdminTools/redux/planBuilder/plans';
import { requestProductsAsync } from '@/modules/AdminTools/redux/productManager/products';

const PromoCode = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestPlansAsync.request());
    dispatch(requestProductsAsync.request());
    dispatch(requestPromotionsAsync.request());
    dispatch(requestCampaignsAsync.request());
    dispatch(requestPromotionTypesAsync.request());
    dispatch(requestCampaignChannelsAsync.request());
  }, [dispatch]);

  const links = promoCodesRoutes.map((route) => ({
    to: route.path,
    text: route.name,
  }));

  return <Tabs links={links} />;
};

export default PromoCode;
