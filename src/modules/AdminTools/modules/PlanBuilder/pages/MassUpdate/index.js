import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';

import Plans from './Plans';
import Areas from './Areas';
import {
  massUpdateAsync,
  planMassUpdated,
  requestPlansAsync,
} from '@/modules/AdminTools/redux/planBuilder/plans';
import { useEffect, useState } from 'react';
import { requestAreasListAsync } from '@/redux/areas-new';
import { requestProductsAsync } from '@/modules/AdminTools/redux/productManager/products';
import { requestSettingsAsync } from '@/modules/AdminTools/redux/planBuilder/settings';
import {
  requestAreaPlansAsync,
  requestBillingFrequenciesAsync,
} from '@/modules/AdminTools/redux/planBuilder/area-plans';
import { CustomButton } from '@/components/common';
import PlanData from './Form/PlanData';
import AreaData from './Form/AreaData';

function removeEmptyFields(obj) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      removeEmptyFields(obj[key]);
    }
  }
}

const MassUpdate = () => {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const massUpdated = useSelector(planMassUpdated);

  const methods = useForm({
    defaultValues: {
      plan_ids: [],
      area_ids: [],
      plan_data: {},
      area_data: {},
    },
  });

  const handleSubmit = (data) => {
    if (
      !confirm(
        `This may update multiple plans/areas.
Are you sure you want to proceed?`
      )
    ) {
      return;
    }

    removeEmptyFields(data);
    dispatch(massUpdateAsync.request(data));
    setUpdating(true);
  };

  useEffect(() => {
    dispatch(requestAreaPlansAsync.request());
    dispatch(requestPlansAsync.request());
    dispatch(requestAreasListAsync.request());
    dispatch(requestProductsAsync.request());
    dispatch(requestSettingsAsync.request());
    dispatch(requestBillingFrequenciesAsync.request());
  }, [dispatch]);

  useEffect(() => {
    if (massUpdated !== null) {
      setUpdating(false);
    }
  }, [massUpdated]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className="flex flex-col space-y-4">
          <div className="p-4">
            <CustomButton
              disabled={updating}
              color="green"
              type="submit"
              className="float-right"
            >
              Save
            </CustomButton>
          </div>
          <Plans />
          <PlanData />
          <hr />
          <Areas />
          <AreaData />
        </div>
      </form>
    </FormProvider>
  );
};

export default MassUpdate;
