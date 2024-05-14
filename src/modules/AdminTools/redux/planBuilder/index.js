import { plansReducer, plansWatcher } from './plans';
import { planSettingsReducer, settingsWatcher } from './settings';
import {
  planBuilderApiClientsReducer,
  planBuilderApiClientWatcher,
} from './api-clients';
import {
  planCanSellTotalsThresholdReducer,
  planCanSellTotalsThresholdWatcher,
} from './plan-can-sell-totals-threshold';
import { canEditReducers, canEditWatchers } from './can-edit-settings';
import {
  planUpgradePathsReducer,
  planUpgradePathsWatcher,
} from './plan-upgrade-paths';
import { repDetailsReducer, repDetailsWatcher } from './rep-details';
import { areaPlansReducer, areaPlansWatcher } from './area-plans';

export const planBuilderReducers = {
  ...plansReducer,
  ...planSettingsReducer,
  ...planBuilderApiClientsReducer,
  ...planCanSellTotalsThresholdReducer,
  ...planUpgradePathsReducer,
  ...repDetailsReducer,
  ...areaPlansReducer,
  ...canEditReducers,
};

export const planBuilderSagas = [
  plansWatcher(),
  settingsWatcher(),
  planBuilderApiClientWatcher(),
  planCanSellTotalsThresholdWatcher(),
  planUpgradePathsWatcher(),
  repDetailsWatcher(),
  areaPlansWatcher(),
  ...canEditWatchers,
];
