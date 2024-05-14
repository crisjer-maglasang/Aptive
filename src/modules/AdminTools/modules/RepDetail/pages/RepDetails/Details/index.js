import { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { planBuilderRepDetailsSelector } from '@/modules/AdminTools/redux/planBuilder/rep-details';
import PlanName from './PlanName';

const Details = () => {
  const [searchParams] = useSearchParams();

  const details = useSelector(planBuilderRepDetailsSelector);

  const repId = useMemo(() => +searchParams.get('rep_id'), [searchParams]);

  const repDetails = useMemo(() => {
    const detail = details.get(repId);

    return detail;
  }, [repId, details]);

  const isQualifiedForFloorDiscount = useMemo(
    () => repDetails && repDetails['is_qualified_for_floor_discount'],
    [repDetails]
  );

  const mustSellMultiYear = useMemo(
    () => repDetails && repDetails['must_sell_multi_year'],
    [repDetails]
  );

  const cantSellPlanIds = useMemo(
    () => (repDetails && repDetails['cant_sell_plan_ids']) || [],
    [repDetails]
  );

  return (
    <div className="flex flex-col border border-gray-200 bg-white m-4 p-2 rounded-lg">
      <div className="flex flex-row">
        <div>{'Is qualified for floor discount:'}</div>
        <div className="w-2" />
        {isQualifiedForFloorDiscount ? (
          <div className="text-green-500">Yes</div>
        ) : (
          <div className="text-red-500">No</div>
        )}
      </div>
      <div className="flex flex-row">
        <div>{'Must Sell Multi Year Contracts:'}</div>
        <div className="w-2" />
        {mustSellMultiYear ? (
          <div className="text-green-500">Yes</div>
        ) : (
          <div className="text-red-500">No</div>
        )}
      </div>
      <div className="flex flex-row">
        <div>{'Can\'t Sell Plans:'}</div>
        <div className="w-2" />
        <div>
          {cantSellPlanIds.map((planId, index) => (
            <Fragment key={planId}>
              <PlanName {...{ planId }} />
              {index < cantSellPlanIds.length - 1 && ', '}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
