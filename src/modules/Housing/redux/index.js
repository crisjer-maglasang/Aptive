import { apartmentReducer, apartmentWatcher } from './apartment';
import { areaReducer, areaWatcher } from './area';
import { ledgerActionWatcher, ledgerReducer } from './ledger';
import { partnershipReducer, partnershipWatcher } from './partnership';
import { bedManagementReducer, bedManagementWatcher } from './bedManagement';
import { bedsHistoryReducer, bedsHistoryActionWatcher } from './bedsHistory';
import { seasonReducer, seasonWatcher } from './season';

export const housingReducers = {
  housingArea: areaReducer,
  apartment: apartmentReducer,
  partnership: partnershipReducer,
  ledger: ledgerReducer,
  bedManagement: bedManagementReducer,
  bedsHistory: bedsHistoryReducer,
  season: seasonReducer,
};

export const housingSagas = [
  apartmentWatcher(),
  areaWatcher(),
  partnershipWatcher(),
  ledgerActionWatcher(),
  bedManagementWatcher(),
  bedsHistoryActionWatcher(),
  seasonWatcher(),
];
