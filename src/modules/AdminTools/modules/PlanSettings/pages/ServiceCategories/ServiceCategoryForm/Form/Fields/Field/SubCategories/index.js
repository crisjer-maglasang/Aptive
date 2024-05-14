import { useFieldArray, useWatch } from 'react-hook-form';

import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import Labeled from '@/modules/AdminTools/components/Labeled';
import SubCategoriesTable from './SubCategoriesTable';
import AddSubCategory from './AddSubCategory';

const {
  ID,
  ORDER,
  PRODUCT_SUB_CATEGORIES,
  PRODUCT_SUB_CATEGORIES_LABEL,
  REMOVE_CONFIRM,
} = productManagerConstants;

const SubCategories = () => {
  const subCategories = useFieldArray({ name: PRODUCT_SUB_CATEGORIES });

  const shouldShow = useWatch({ name: ID });

  const append = () => {
    subCategories.append({
      [ORDER]: 0,
    });
  };

  const removeConfirm = (index) => {
    if (!window.confirm(REMOVE_CONFIRM)) {
      return;
    }

    subCategories.remove(index);
  };

  if (!shouldShow) {
    return null;
  }

  return (
    <Labeled label={PRODUCT_SUB_CATEGORIES_LABEL}>
      <SubCategoriesTable
        subCategories={subCategories.fields}
        remove={removeConfirm}
      />
      <AddSubCategory {...{ append }} />
    </Labeled>
  );
};

export default SubCategories;
