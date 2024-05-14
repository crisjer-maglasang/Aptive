import { useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';

import { planBuilderRepPlansSelector } from '@/modules/AdminTools/redux/planBuilder/rep-details';
import { table } from './table';
import SortingDataTable from '@/modules/AdminTools/components/DataTable/SortingDataTable';
import { pricingConstants } from '@/modules/AdminTools/lib/constants';

const sortOrders = ['order', 'name', ...pricingConstants.PRICE_IDS];

const RepPlans = () => {
  const repPlans = useSelector(planBuilderRepPlansSelector);

  const indexMap = useMemo(() => {
    const map = new Map();

    repPlans.forEach(({ id }, index) => {
      map.set(id, index);
    });

    return map;
  }, [repPlans]);

  const rowMap = useCallback(
    (datum) => ({
      ...datum,
      index: indexMap.get(datum.id),
    }),
    [indexMap]
  );

  return (
    <SortingDataTable
      data={repPlans}
      {...{
        rowMap,
        table,
        sortOrders,
      }}
    />
  );
};

export default RepPlans;
