import { createAsyncAction } from '@/redux/root';
import { nameSpace } from './nameSpace';
import { settingsReducer } from './settings-reducer';
import { settingsWatcher } from './settings-saga';
import { settingsSelector } from './settings-selector';

export const planPricingLevelNameSpace = `${nameSpace}/plan-pricing-levels`;

export const updatePlanPricingLevelAsync = createAsyncAction(
  `${planPricingLevelNameSpace}/UPDATE_PLAN_PRICING_LEVEL`
);

export const createPlanPricingLevelAsync = createAsyncAction(
  `${planPricingLevelNameSpace}/CREATE_PLAN_PRICING_LEVEL`
);

export const removePlanPricingLevelAsync = createAsyncAction(
  `${planPricingLevelNameSpace}/REMOVE_PLAN_PRICING_LEVEL`
);

export const requestPlanPricingLevelsAsync = createAsyncAction(
  `${planPricingLevelNameSpace}/REQUEST_PLAN_PRICING_LEVEL`
);

const NAME = 'planPricingLevel';

export const planPricingLevelsReducer = {
  [NAME]: settingsReducer(planPricingLevelNameSpace, {
    updateAsync: updatePlanPricingLevelAsync,
    createAsync: createPlanPricingLevelAsync,
    removeAsync: removePlanPricingLevelAsync,
    requestsAsync: requestPlanPricingLevelsAsync,
  }),
};

export function* planPricingLevelWatcher() {
  yield settingsWatcher('plan-pricing-levels', {
    removeAsync: removePlanPricingLevelAsync,
    updateAsync: updatePlanPricingLevelAsync,
    createAsync: createPlanPricingLevelAsync,
    requestsAsync: requestPlanPricingLevelsAsync,
  });
}

export const planPricingLevelsSelector = settingsSelector(NAME);
