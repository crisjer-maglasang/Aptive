import { useDispatch } from 'react-redux';

import { createPlanAsync } from '@/modules/AdminTools/redux/planBuilder/plans';
import PlanForm from './PlanForm';

const CreatePlan = () => {
  const dispatch = useDispatch();

  const createPlan = (data) => dispatch(createPlanAsync.request(data));

  const plan = {
    name: '',
    plan_category_ids: [],
    plan_status_id: '',
    plan_service_frequency_id: '',
    agreement_length_ids: [],
    start_on: '',
    end_on: '',
    default_area_plan: {
      area_plan_pricings: [],
      addons: [],
      service_product_ids: [],
    },
    area_plans: [],
  };

  return (
    <PlanForm defaultValues={plan} onSubmit={createPlan} submitText="Create" />
  );
};

export default CreatePlan;
