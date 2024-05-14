import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { CustomFormElement } from '@/components';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import { productSubCategorySelector } from '@/modules/AdminTools/redux/productManager/products-sub-categories';

const { PRODUCT_SUB_CATEGORY, PRODUCT_SUB_CATEGORY_LABEL, PRODUCT_CATEGORY } =
  productManagerConstants;

const SubCategory = () => {
  const subCategories = useSelector(productSubCategorySelector);
  const createProductErrors = useSelector(
    (state) => state?.errors?.errors?.productsUpdate
  );
  const subCategoryError = createProductErrors?.[PRODUCT_SUB_CATEGORY] || null;

  const { register, setValue } = useFormContext();
  const categoryId = useWatch({
    name: PRODUCT_CATEGORY,
  });
  const subCategoryId = useWatch({
    name: PRODUCT_SUB_CATEGORY,
  });

  const subCategoryOptions = useMemo(() => {
    const options = [{ name: 'Select a Sub-Category', value: '' }];

    if (subCategories && categoryId) {
      options.push(...subCategories.getOptions(categoryId));
    } else if (subCategories) {
      options.push(...subCategories.options);
    }

    return options;
  }, [subCategories, categoryId]);

  useEffect(() => {
    const hasOption =
      subCategoryOptions.filter(({ value }) => +value === +subCategoryId)
        .length > 0;

    if (!hasOption) {
      setValue(PRODUCT_SUB_CATEGORY, '');
    }
  }, [subCategoryOptions, subCategoryId, setValue]);

  return (
    <CustomFormElement
      {...{ register }}
      type="select"
      name={PRODUCT_SUB_CATEGORY}
      label={PRODUCT_SUB_CATEGORY_LABEL}
      selectOptions={subCategoryOptions}
      required
      error={subCategoryError}
      onChange={({ target: { value } }) =>
        setValue(PRODUCT_SUB_CATEGORY, value)
      }
    />
  );
};

export default SubCategory;
