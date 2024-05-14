import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

import table from './table';
import { plansSelector, removePlanAsync } from '@/modules/AdminTools/redux/planBuilder/plans';
import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';
import usePlanCategoryFilter from './PlanCategoryFilter';
import SearchableDataTable from '@/modules/AdminTools/components/DataTable/SearchableDataTable';

const { REMOVE_CONFIRM, PLAN_STATUS, START_ON, END_ON, NAME, ORDER } =
  planBuilderConstants;

const sortOrders = [ORDER, PLAN_STATUS, START_ON, END_ON, NAME];

const PlansTable = () => {
  const dispatch = useDispatch();

  const plans = useSelector(plansSelector);

  const loading = useSelector((state) => state?.loading);
  const isLoadingPlans = loading?.plans?.isLoading || false;
  const isLoadingSettings = loading?.settings?.isLoading || false;
  const isLoading = isLoadingPlans || isLoadingSettings;

  const settings = useSelector(settingsSelector);

  const remove = useCallback(
    (id) => {
      if (!window.confirm(REMOVE_CONFIRM)) {
        return;
      }

      dispatch(removePlanAsync.request({ id }));
    },
    [dispatch]
  );

  const settingsForField = useMemo(
    () => ({
      [PLAN_STATUS]: (id) => settings.get('plan_statuses', id, ORDER),
    }),
    [settings]
  );

  const getSortField = useCallback(
    (sortingBy) => {
      if (sortingBy.endsWith('_id')) {
        const field = settingsForField[sortingBy];

        return (plan) => field(plan[sortingBy]);
      }

      return (targetContractValue) => targetContractValue[sortingBy];
    },
    [settingsForField]
  );

  const getSearchField = ({ name }) => name;

  const rowMap = useCallback(
    (plan) => ({
      plan,
      settings,
      remove: () => remove(plan.id),
    }),
    [settings, remove]
  );

  const { filteredData, PlanCategoryFilter } = usePlanCategoryFilter({ plans });

  return (
    <SearchableDataTable
      topLeftChildren={PlanCategoryFilter}
      loading={isLoading}
      data={filteredData}
      searchPlaceholder={'Search Plans'}
      {...{ getSortField, rowMap, table, sortOrders, getSearchField }}
    />
  );
};

export default PlansTable;
