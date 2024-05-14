import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const subCategoriesNameSpace = `${nameSpace}/sub_categories`;

export const requestSubCategoriesAsync = createAsyncAction(
  `${subCategoriesNameSpace}/REQUEST_SUB_CATEGORIES`
);
