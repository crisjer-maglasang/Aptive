import * as authApis from './auth/auth';
import * as contractsApis from './contracts/api';
import * as recruiterApis from './recruiters/api';
import * as repsApis from './reps';
import * as userApis from './user';
import * as fileApis from './files';
import * as addressApis from './addresses/api';
import * as teamsApis from './teams/api';
import * as areasApis from './areas';
import * as polygonsApis from './polygons/api';
import * as clustersApis from './clusters';
import * as seasons from './seasons/api';
import * as salesOperations from './sales-operations';
import * as notificationsApis from './notifications';

import * as addressesMappers from './addresses/mappers';
import * as recruitersMappers from './recruiters/mappers';
import * as seasonsMappers from './seasons/mappers';
import * as authMappers from './auth/mappers';
import * as teamsMappers from './teams/mappers';
import * as contractsMappers from './contracts/mappers';
import * as polygonsMappers from './polygons/mappers';

const combinedApis = {
  ...authApis,
  ...contractsApis,
  ...recruiterApis,
  ...repsApis,
  ...userApis,
  ...fileApis,
  ...addressApis,
  ...teamsApis,
  ...polygonsApis,
  ...areasApis,
  ...clustersApis,
  ...seasons,
  ...salesOperations,
  ...notificationsApis,
};

export const combinedMappers = {
  ...addressesMappers,
  ...recruitersMappers,
  ...seasonsMappers,
  ...authMappers,
  ...teamsMappers,
  ...polygonsMappers,
  ...contractsMappers,
};

export default combinedApis;

