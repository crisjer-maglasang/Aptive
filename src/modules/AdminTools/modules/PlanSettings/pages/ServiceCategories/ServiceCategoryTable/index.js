import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import table from './table';
import {
  productCategorySelector,
  removeProductCategoryAsync,
} from '@/modules/AdminTools/redux/productManager/product-categories';
import SearchableDataTable from '@/modules/AdminTools/components/DataTable/SearchableDataTable';

const { NAME, ORDER, PRODUCT_SUB_CATEGORIES, REMOVE_CONFIRM } =
  productManagerConstants;

const sortOrders = [NAME, ORDER, PRODUCT_SUB_CATEGORIES];

const ServiceCategoryTable = () => {
  const dispatch = useDispatch();

  const categories = useSelector(productCategorySelector).categories;

  const remove = useCallback(
    (id) => {
      if (!window.confirm(REMOVE_CONFIRM)) {
        return;
      }

      dispatch(removeProductCategoryAsync.request({ id }));
    },
    [dispatch]
  );

  const getSortField = useCallback((sortingBy) => {
    if (sortingBy === PRODUCT_SUB_CATEGORIES) {
      return (category) => category[PRODUCT_SUB_CATEGORIES]?.length;
    }

    return (category) => category[sortingBy];
  }, []);

  const getSearchField = ({ name }) => name;

  const rowMap = useCallback(
    (category) => ({
      category,
      remove: () => remove(category.id),
    }),
    [remove]
  );

  return (
    <SearchableDataTable
      data={categories}
      searchPlaceholder="Search Categories"
      {...{ getSortField, rowMap, table, sortOrders, getSearchField }}
    />
  );
};

export default ServiceCategoryTable;
