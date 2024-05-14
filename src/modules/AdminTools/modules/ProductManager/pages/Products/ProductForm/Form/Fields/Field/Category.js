import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { CustomFormElement } from '@/components';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import { productCategorySelector } from '@/modules/AdminTools/redux/productManager/product-categories';
import { productSubCategorySelector } from '@/modules/AdminTools/redux/productManager/products-sub-categories';

const { PRODUCT_SUB_CATEGORY, PRODUCT_CATEGORY, PRODUCT_CATEGORY_LABEL } =
  productManagerConstants;

const Category = () => {
  const categories = useSelector(productCategorySelector);
  const subCategories = useSelector(productSubCategorySelector);

  const { register, setValue } = useFormContext();

  const subCategoryId = useWatch({
    name: PRODUCT_SUB_CATEGORY,
  });

  useEffect(() => {
    if (subCategoryId !== '') {
      setValue(
        PRODUCT_CATEGORY,
        subCategories?.get(subCategoryId)?.product_category_id
      );
    }
  }, [setValue, subCategories, subCategoryId]);

  const categoryOptions = useMemo(() => {
    return [
      {
        name: 'Select a Category',
        value: '',
      },
      ...(categories?.options || []),
    ];
  }, [categories]);

  return (
    <CustomFormElement
      {...{ register }}
      type="select"
      name={PRODUCT_CATEGORY}
      label={PRODUCT_CATEGORY_LABEL}
      selectOptions={categoryOptions}
      onChange={({ target: { value } }) => setValue(PRODUCT_CATEGORY, value)}
    />
  );
};

export default Category;
