import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { planSelector, updatePlanAsync } from '@/modules/AdminTools/redux/planBuilder/plans';
import PlanForm from './PlanForm';

const EditPlan = () => {
  const dispatch = useDispatch();

  const updatePlan = (data) => dispatch(updatePlanAsync.request(data));

  const plan = useSelector(planSelector);

  const id = useParams().id;

  if (+plan?.id !== +id) {
    return null;
  }

  return (
    <PlanForm
      defaultValues={plan}
      onSubmit={updatePlan}
      submitText={'Update'}
    />
  );
};

export default EditPlan;
