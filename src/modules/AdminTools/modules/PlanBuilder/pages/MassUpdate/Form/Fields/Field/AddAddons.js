import { default as BaseAddons } from '../../../../PlanForm/AreaPlans/AreaPlan/AreaProductPricings/Addons';

const AddAddons = () => {
  return <BaseAddons AddonsHeader={() => 'Add/Update Additional Services'} required={false} />;
};

export default AddAddons;
