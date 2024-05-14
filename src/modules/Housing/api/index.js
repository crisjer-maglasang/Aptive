import * as apartmentApis from './apartment/api';
import * as apartmentMappers from './apartment/mappers';
import * as areaApis from './area/api';
import * as areaMappers from './area/mappers';
import * as partnershipApis from './partnership/api';
import * as partnershipMappers from './partnership/mappers';
import * as ledgerApis from './ledger/api';
import * as ledgerMappers from './ledger/mappers';
import * as bedManagementApis from './bedManagement/api';
import * as bedManagementMappers from './bedManagement/mappers';
import * as bedsHistoryApis from './bedsHistory/api';
import * as bedsHistoryMappers from './bedsHistory/mappers';
import * as seasonApis from './season/api';
import * as seasonMappers from './season/mappers';

const combinedApis = {
  ...apartmentApis,
  ...areaApis,
  ...partnershipApis,
  ...ledgerApis,
  ...bedManagementApis,
  ...bedsHistoryApis,
  ...seasonApis,
};

export const Mapper = {
  ...apartmentMappers,
  ...areaMappers,
  ...partnershipMappers,
  ...ledgerMappers,
  ...bedManagementMappers,
  ...bedsHistoryMappers,
  ...seasonMappers,
};

export default combinedApis;
