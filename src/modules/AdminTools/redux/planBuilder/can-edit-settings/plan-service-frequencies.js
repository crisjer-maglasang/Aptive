import { createAsyncAction } from '@/redux/root';
import { nameSpace } from './nameSpace';
import { settingsReducer } from './settings-reducer';
import { settingsWatcher } from './settings-saga';
import { settingsSelector } from './settings-selector';

export const planServiceFrequencyNameSpace = `${nameSpace}/plan-service-frequencies`;

export const updatePlanServiceFrequencyAsync = createAsyncAction(
  `${planServiceFrequencyNameSpace}/UPDATE_PLAN_SERVICE_FREQUENCY`
);

export const createPlanServiceFrequencyAsync = createAsyncAction(
  `${planServiceFrequencyNameSpace}/CREATE_PLAN_SERVICE_FREQUENCY`
);

export const removePlanServiceFrequencyAsync = createAsyncAction(
  `${planServiceFrequencyNameSpace}/REMOVE_PLAN_SERVICE_FREQUENCY`
);

export const requestPlanServiceFrequenciesAsync = createAsyncAction(
  `${planServiceFrequencyNameSpace}/REQUEST_PLAN_SERVICE_FREQUENCY`
);

const NAME = 'planServiceFrequency';

export const planServiceFrequenciesReducer = {
  [NAME]: settingsReducer(planServiceFrequencyNameSpace, {
    updateAsync: updatePlanServiceFrequencyAsync,
    createAsync: createPlanServiceFrequencyAsync,
    removeAsync: removePlanServiceFrequencyAsync,
    requestsAsync: requestPlanServiceFrequenciesAsync,
  }),
};

export function* planServiceFrequencyWatcher() {
  yield settingsWatcher('plan-service-frequencies', {
    removeAsync: removePlanServiceFrequencyAsync,
    updateAsync: updatePlanServiceFrequencyAsync,
    createAsync: createPlanServiceFrequencyAsync,
    requestsAsync: requestPlanServiceFrequenciesAsync,
  });
}

export const planServiceFrequenciesSelector = settingsSelector(NAME);
