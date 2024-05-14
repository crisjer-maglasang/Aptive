import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const settingsNameSpace = `${nameSpace}/settings`;

export const requestSettingsAsync = createAsyncAction(
  `${settingsNameSpace}/REQUEST_SETTINGS`
);
