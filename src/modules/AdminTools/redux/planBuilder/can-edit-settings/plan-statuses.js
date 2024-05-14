import { createAsyncAction } from '@/redux/root';
import { nameSpace } from './nameSpace';
import { settingsReducer } from './settings-reducer';
import { settingsWatcher } from './settings-saga';
import { settingsSelector } from './settings-selector';

const NAME = 'plan_statuses';

const namespace = `${nameSpace}/${NAME}`;

export const updatePlanStatusAsync = createAsyncAction(
  `${namespace}/UPDATE_${NAME}`
);

export const createPlanStatusAsync = createAsyncAction(
  `${namespace}/CREATE_${NAME}`
);

export const removePlanStatusAsync = createAsyncAction(
  `${namespace}/REMOVE_${NAME}`
);

export const requestPlanStatusesAsync = createAsyncAction(
  `${namespace}/REQUEST_${NAME}`
);

export const planStatusesReducer = {
  [NAME]: settingsReducer(namespace, {
    updateAsync: updatePlanStatusAsync,
    createAsync: createPlanStatusAsync,
    removeAsync: removePlanStatusAsync,
    requestsAsync: requestPlanStatusesAsync,
  }),
};

export function* planStatusWatcher() {
  yield settingsWatcher('plan-statuses', {
    removeAsync: removePlanStatusAsync,
    updateAsync: updatePlanStatusAsync,
    createAsync: createPlanStatusAsync,
    requestsAsync: requestPlanStatusesAsync,
  });
}

export const planStatusesSelector = settingsSelector(NAME);
