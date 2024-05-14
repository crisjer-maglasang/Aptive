import { useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';

import {
  createPlanUpgradePathAsync,
  removePlanUpgradePathAsync,
  planUpgradePathsSelector,
  updatePlanUpgradePathAsync,
} from '@/modules/AdminTools/redux/planBuilder/plan-upgrade-paths';
import { plansSelector } from '@/modules/AdminTools/redux/planBuilder/plans';
import { fields } from './fields';
import EditDataTable from '@/modules/AdminTools/components/EditDataTable';
import { planUpgradePathConstants } from '@/modules/AdminTools/lib/constants';
import useCategoryFilter from './CategoryFilter';

const {
  UPGRADE_TO,
  UPGRADE_FROM,
  PRICE_DISCOUNT,
  USE_TO_PLAN_PRICE,
  MONTHLY_DISCOUNT,
} = planUpgradePathConstants;

const sortOrders = [UPGRADE_FROM, UPGRADE_TO, PRICE_DISCOUNT];

const title = 'Plan Upgrade Paths';

const name = 'planUpgradePath';

const defaultValues = {
  [UPGRADE_TO]: '',
  [UPGRADE_FROM]: '',
  [PRICE_DISCOUNT]: 0,
  [MONTHLY_DISCOUNT]: 0,
  [USE_TO_PLAN_PRICE]: 'true',
};

const searchPlaceholder = 'Search by Upgrade To';

const schema = yup.object().shape({
  [UPGRADE_TO]: yup.string().required('Upgrade to is required.'),
  [UPGRADE_FROM]: yup.string().required('Upgrade from is required.'),
  [PRICE_DISCOUNT]: yup
    .number()
    .typeError('Price discount must be a number.')
    .min(0)
    .required('Price discount is required.'),
  [MONTHLY_DISCOUNT]: yup
    .number()
    .typeError('Monthly discount must be a number.')
    .min(0)
    .required('Monthly discount is required.'),
});

const PlanUpgradePaths = () => {
  const plans = useSelector(plansSelector);

  const planOrderMap = useMemo(() => {
    const map = new Map();

    plans.forEach(({ id, order }) => {
      map.set(id, order);
    });

    return map;
  }, [plans]);

  const getSortField = useCallback(
    (sortingBy) => {
      if (sortingBy === UPGRADE_TO || sortingBy === UPGRADE_FROM) {
        return (planUpgradePath) => {
          const planId = planUpgradePath[sortingBy];

          return planOrderMap.get(planId);
        };
      }

      return (planUpgradePath) => planUpgradePath[sortingBy];
    },
    [planOrderMap]
  );

  const planNameMap = useMemo(() => {
    const map = {};
    plans.forEach(({ id, name }) => {
      map[id] = name;
    });

    return map;
  }, [plans]);

  const getSearchField = ({ upgrade_to_plan_id, upgrade_from_plan_id }) => {
    return [planNameMap[upgrade_to_plan_id], planNameMap[upgrade_from_plan_id]];
  };

  return (
    <EditDataTable
      {...{
        sortOrders,
        searchPlaceholder,
        getSearchField,
        defaultValues,
        title,
        fields,
        name,
        getSortField,
        schema,
      }}
      filters={[useCategoryFilter]}
      updateAsync={updatePlanUpgradePathAsync}
      removeAsync={removePlanUpgradePathAsync}
      createAsync={createPlanUpgradePathAsync}
      selector={planUpgradePathsSelector}
    />
  );
};

export default PlanUpgradePaths;
