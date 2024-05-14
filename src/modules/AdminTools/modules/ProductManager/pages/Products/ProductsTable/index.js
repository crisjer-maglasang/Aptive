import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import table from './table';
import { productsSelector } from '@/modules/AdminTools/redux/productManager/products';
import { productCategorySelector } from '@/modules/AdminTools/redux/productManager/product-categories';
import { productSubCategorySelector } from '@/modules/AdminTools/redux/productManager/products-sub-categories';
import SearchableDataTable from '@/modules/AdminTools/components/DataTable/SearchableDataTable';

const { NAME, ORDER, PRODUCT_CATEGORY, PRODUCT_SUB_CATEGORY, SEARCH_SERVICE } =
  productManagerConstants;

const sortOrders = [PRODUCT_CATEGORY, PRODUCT_SUB_CATEGORY, ORDER, NAME];

const ProductsTable = () => {
  const products = useSelector(
    (state) => productsSelector(state)?.products || []
  );

  const categories = useSelector(productCategorySelector);
  const subCategories = useSelector(productSubCategorySelector);

  const settingsForField = useMemo(
    () => ({
      [PRODUCT_CATEGORY]: (subCategoryId, field) => {
        const subCategory = subCategories.get(subCategoryId);
        if (subCategory) {
          const categoryId = subCategory[PRODUCT_CATEGORY];
          const category = categories.get(categoryId);
          if (category) {
            return category[field];
          }
        }
      },
      [PRODUCT_SUB_CATEGORY]: (subCategoryId, field) => {
        const subCategory = subCategories.get(subCategoryId);
        if (subCategory) {
          return subCategory[field];
        }
      },
    }),
    [categories, subCategories]
  );

  const getSortField = useCallback(
    (sortingBy) => {
      if ([PRODUCT_CATEGORY, PRODUCT_SUB_CATEGORY].includes(sortingBy)) {
        const field = settingsForField[sortingBy];

        return (product) => field(product[PRODUCT_SUB_CATEGORY], NAME);
      }

      return (product) => product[sortingBy];
    },
    [settingsForField]
  );

  const getSearchField = ({ name }) => name;

  const rowMap = useCallback(
    (product) => ({
      product,
    }),
    []
  );

  return (
    <SearchableDataTable
      data={products}
      searchPlaceholder={SEARCH_SERVICE}
      {...{ getSortField, rowMap, table, sortOrders, getSearchField }}
    />
  );
};

export default ProductsTable;
