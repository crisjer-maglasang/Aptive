import * as plans from './plans';
import * as settings from './settings';
import * as apiClients from './api-clients';
import * as planUpgradePaths from './plan-upgrade-paths';
import * as areaPlans from './area-plans';
import * as repDetails from './rep-details';
import * as billingFrequencies from './area-plan-billing-frequencies';

const combinedApis = {
  ...plans,
  ...settings,
  ...apiClients,
  ...planUpgradePaths,
  ...areaPlans,
  ...repDetails,
  ...billingFrequencies,
};

export default combinedApis;
