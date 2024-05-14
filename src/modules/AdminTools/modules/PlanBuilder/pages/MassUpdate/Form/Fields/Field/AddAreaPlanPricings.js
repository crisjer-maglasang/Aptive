import { default as BaseAreaPlanPricings } from '../../../../PlanForm/AreaPlans/AreaPlan/AreaPlanPricings';

const AddAreaPlanPricings = () => {
  return (
    <BaseAreaPlanPricings
      LevelsHeader={() => 'Add/Update Pricing Levels'}
      required={false}
    />
  );
};

export default AddAreaPlanPricings;
