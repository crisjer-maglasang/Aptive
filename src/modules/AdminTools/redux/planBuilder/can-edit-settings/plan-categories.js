import { createAsyncAction } from '@/redux/root';
import { nameSpace } from './nameSpace';
import { settingsReducer } from './settings-reducer';
import { settingsWatcher } from './settings-saga';
import { settingsSelector } from './settings-selector';

const planCategoryNameSpace = `${nameSpace}/plan-categories`;

export const updatePlanCategoryAsync = createAsyncAction(
  `${planCategoryNameSpace}/UPDATE_PLAN_CATEGORY`
);

export const createPlanCategoryAsync = createAsyncAction(
  `${planCategoryNameSpace}/CREATE_PLAN_CATEGORY`
);

export const removePlanCategoryAsync = createAsyncAction(
  `${planCategoryNameSpace}/REMOVE_PLAN_CATEGORY`
);

export const requestPlanCategoriesAsync = createAsyncAction(
  `${planCategoryNameSpace}/REQUEST_PLAN_CATEGORY`
);

const NAME = 'planCategory';

export const planCategoriesReducer = {
  [NAME]: settingsReducer(planCategoryNameSpace, {
    updateAsync: updatePlanCategoryAsync,
    createAsync: createPlanCategoryAsync,
    removeAsync: removePlanCategoryAsync,
    requestsAsync: requestPlanCategoriesAsync,
  }),
};

export function* planCategoryWatcher() {
  yield settingsWatcher('plan-categories', {
    removeAsync: removePlanCategoryAsync,
    updateAsync: updatePlanCategoryAsync,
    createAsync: createPlanCategoryAsync,
    requestsAsync: requestPlanCategoriesAsync,
  });
}

export const planCategoriesSelector = settingsSelector(NAME);
