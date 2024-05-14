import { useState, useCallback } from 'react';
import { dashboardConstants } from '@/lib/constants';

const { DESC_ORDER } = dashboardConstants;

export const useSortTable = () => {
  const [sortParams, setSortParams] = useState([]);

  const compileSortParams = (sortParams) => {
    return sortParams
      .map(({ name, order }) => `${(order === DESC_ORDER ? '-' : '')}${name}`)
      .join(',');
  };

  const getSortParam = useCallback((sortId) =>
    sortParams.find(({ name }) => name === sortId), [sortParams]);

  const onSortParamsChange = useCallback((newParam) => {
    const isSorting = Boolean(newParam.order);
    let params;

    if (isSorting) {
      const isParamExist = sortParams.findIndex((sortParam) => sortParam.name === newParam.name) !== -1;

      if (isParamExist) {
        params = sortParams.map((sortParam) => (sortParam.name === newParam.name
          ? { ...sortParam, ...newParam }
          : sortParam));
      } else {
        params = [...sortParams, newParam];
      }
    } else {
      params = sortParams.filter(({ name }) => name !== newParam.name);
    }
    setSortParams(params.map((param, i) => ({ ...param, index: i + 1 })));
  }, [sortParams]);

  const resetSorting = useCallback(() => setSortParams([]), []);

  return {
    sortParams,
    resetSorting,
    getSortParam,
    onSortParamsChange,
    sortQueryParams: compileSortParams(sortParams),
  };
};
