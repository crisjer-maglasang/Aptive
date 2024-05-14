import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import { CustomButton } from '@/components';
import { requestRepPlansAsync } from '@/modules/AdminTools/redux/planBuilder/rep-details';
import AreaSelect from './AreaSelect';
import PlanPricingLevelSelect from './PlanPricingLevelSelect';
import RepSearch from './RepSearch';
// import PlanCategorySelect from './PlanCategorySelect';

const RepDetailsForm = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const methods = useForm({
    defaultValues: {
      rep_id: +searchParams.get('rep_id') || '',
      area_id: +searchParams.get('area_id') || '',
      plan_pricing_level_id: +searchParams.get('plan_pricing_level_id'),
      plan_category_id: 1,
    },
  });

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    if (params.plan_pricing_level_id) {
      dispatch(requestRepPlansAsync.request(params));
    }
  }, [dispatch, searchParams]);

  const search = (data) => {
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== '') {
        searchParams.set(key, +`${data[key]}`);
      } else {
        searchParams.delete(key);
      }
    });

    setSearchParams(searchParams);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(search)}>
        <div className="flex flex-col m-4">
          <div className="flex flex-row space-x-4">
            <RepSearch />
            <AreaSelect />
            <PlanPricingLevelSelect />
            {/* <PlanCategorySelect /> */}
          </div>
          <div className="mt-4">
            <CustomButton color={'green'} type="submit">
              Search
            </CustomButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default RepDetailsForm;
