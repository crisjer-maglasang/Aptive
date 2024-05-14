import { createAsyncAction } from '@/redux/root';
import { nameSpace } from './nameSpace';
import { settingsReducer } from './settings-reducer';
import { settingsWatcher } from './settings-saga';
import { settingsSelector } from './settings-selector';

export const targetContractValueNameSpace = `${nameSpace}/target-contract-values`;

export const updateTargetContractValueAsync = createAsyncAction(
  `${targetContractValueNameSpace}/UPDATE_TARGET_CONTRACT_VALUES`
);

export const createTargetContractValueAsync = createAsyncAction(
  `${targetContractValueNameSpace}/CREATE_TARGET_CONTRACT_VALUES`
);

export const removeTargetContractValueAsync = createAsyncAction(
  `${targetContractValueNameSpace}/REMOVE_TARGET_CONTRACT_VALUES`
);

export const requestTargetContractValuesAsync = createAsyncAction(
  `${targetContractValueNameSpace}/REQUEST_TARGET_CONTRACT_VALUES`
);

const NAME = 'targetContractValue';

export const targetContractValuesReducer = {
  [NAME]: settingsReducer(targetContractValueNameSpace, {
    updateAsync: updateTargetContractValueAsync,
    createAsync: createTargetContractValueAsync,
    removeAsync: removeTargetContractValueAsync,
    requestsAsync: requestTargetContractValuesAsync,
  }),
};

export function* targetContractValueWatcher() {
  yield settingsWatcher('target-contract-values', {
    removeAsync: removeTargetContractValueAsync,
    updateAsync: updateTargetContractValueAsync,
    createAsync: createTargetContractValueAsync,
    requestsAsync: requestTargetContractValuesAsync,
  });
}

export const targetContractValuesSelector = settingsSelector(NAME);
