import { abilityConstants } from '@/lib';
import { Navigate } from 'react-router';
import {
  PromoCode,
  Campaigns,
  PromotionUsages,
  ReferralUsages,
  PromotionsTable,
} from '../modules/PromoCode';

const { ACCESS_PLAN_BUILDER_ABILITY } = abilityConstants;

export const PATH = '/promo-codes';

export const NAME = 'Promo Codes';

export const promoCodesRoutes = [
  {
    path: 'promotions',
    name: 'Promotions',
    element: <PromotionsTable />,
  },
  {
    path: 'campaigns',
    name: 'Campaigns',
    element: <Campaigns />,
  },
  {
    path: 'promotion-usages',
    name: 'Promotion Usage',
    element: <PromotionUsages />,
  },
  {
    path: 'referral-usages',
    name: 'Referral Usage',
    element: <ReferralUsages />,
  },
];

export const routes = (protectedRoute, layout) => ({
  path: PATH,
  element: layout,
  children: [
    {
      element: protectedRoute(<PromoCode />, ACCESS_PLAN_BUILDER_ABILITY),
      children: [
        {
          index: true,
          element: <Navigate to={promoCodesRoutes[0].path} />,
        },
        ...promoCodesRoutes,
      ],
    },
  ],
});
