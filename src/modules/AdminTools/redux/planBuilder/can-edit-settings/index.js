import {
  agreementLengthsReducer,
  agreementLengthWatcher,
} from './agreement-lengths';
import { planCategoriesReducer, planCategoryWatcher } from './plan-categories';
import {
  planPricingLevelsReducer,
  planPricingLevelWatcher,
} from './plan-pricing-levels';
import {
  planServiceFrequenciesReducer,
  planServiceFrequencyWatcher,
} from './plan-service-frequencies';
import { planStatusesReducer, planStatusWatcher } from './plan-statuses';
import {
  targetContractValuesReducer,
  targetContractValueWatcher,
} from './target-contract-values';

export const canEditReducers = {
  ...planPricingLevelsReducer,
  ...planServiceFrequenciesReducer,
  ...planCategoriesReducer,
  ...planStatusesReducer,
  ...agreementLengthsReducer,
  ...targetContractValuesReducer,
};

export const canEditWatchers = [
  planPricingLevelWatcher(),
  planServiceFrequencyWatcher(),
  planStatusWatcher(),
  planCategoryWatcher(),
  agreementLengthWatcher(),
  targetContractValueWatcher(),
];
