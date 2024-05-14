import { useCallback, useState } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';

import { CustomButton } from '@/components';
import AreaOptions from './AreaOptions';
import AreaPlans from '../AreaPlans';
import Headers from './Headers';
import { pricingConstants } from '@/modules/AdminTools/lib/constants';

const getPricing = (fields, data) => {
  const newData = {};
  fields.forEach((field) => {
    newData[field] = data[field];
  });
  pricingConstants.PRICE_IDS.forEach((pricing) => {
    newData[pricing] = data[pricing];
  });

  return newData;
};

const copyData = (fields) => (data) => getPricing(fields, data);

const Optional = () => {
  const [areaIndex, setAreaIndex] = useState(0);

  const defaultAreaPlan = useWatch({ name: 'default_area_plan' });

  const areaPlans = useFieldArray({ name: 'area_plans' });

  const createNewAreaPlan = useCallback(
    (newAreaId) => {
      if (!newAreaId) {
        return;
      }
      areaPlans.append({
        area_id: newAreaId,
        area_plan_pricings: defaultAreaPlan.area_plan_pricings.map(
          copyData(['plan_pricing_level_id'])
        ),
        addons: defaultAreaPlan.addons.map(
          copyData(['is_recurring', 'product_id'])
        ),
        service_product_ids: [...defaultAreaPlan.service_product_ids],
      });
      setAreaIndex(areaPlans.fields.length);
    },
    [areaPlans, defaultAreaPlan]
  );

  const remove = useCallback(() => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    areaPlans.remove(areaIndex);
    if (areaIndex === areaPlans.fields.length - 1) {
      setAreaIndex((oldIndex) => --oldIndex);
    }
  }, [areaIndex, areaPlans]);

  const headerStyle = {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '24px',
  };

  return (
    <div className="flex flex-col">
      <div style={headerStyle} className="my-8">
        Area specific pricing
      </div>
      <div className="flex flex-row">
        <div>
          <CustomButton onClick={remove}>Remove</CustomButton>
        </div>
        <div className="flex-grow" />
        <AreaOptions {...{ createNewAreaPlan }} />
      </div>
      <AreaPlans {...{ areaIndex, setAreaIndex, Headers }} />
    </div>
  );
};

export default Optional;
