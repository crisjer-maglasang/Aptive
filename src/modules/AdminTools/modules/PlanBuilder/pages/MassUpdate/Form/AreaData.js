import { AreaContext } from '../../PlanForm/AreaPlans/AreaPlan/AreaContext';
import Fields from './Fields';
import AddAddons from './Fields/Field/AddAddons';
import AddAreaPlanPricings from './Fields/Field/AddAreaPlanPricings';
import BillingFrequencies from './Fields/Field/BillingFrequencies';
import PercentageThreshold from './Fields/Field/PercentageThreshold';
import RemoveAddons from './Fields/Field/RemoveAddons';
import RemovePricingLevels from './Fields/Field/RemoveAreaPlanPricings';
import RemoveServices from './Fields/Field/RemoveServices';
import AddServices from './Fields/Field/AddServices';

const areaFieldOptions = [
  { value: 'can_sell_percentage_threshold', label: 'Percentage Threshold' },
  { value: 'billing_frequencies', label: 'Billing Frequencies' },
  { value: 'area_plan_pricings', label: 'Add/Update Pricing Levels' },
  { value: 'service_product_ids', label: 'Add Services' },
  { value: 'addons', label: 'Add/Update Additional Services' },
  { value: 'remove_services', label: 'REMOVE Services' },
  { value: 'remove_addons', label: 'REMOVE Additional Services' },
  { value: 'remove_area_plan_pricings', label: 'REMOVE Pricing Levels' },
];

const Edits = {
  can_sell_percentage_threshold: PercentageThreshold,
  billing_frequencies: BillingFrequencies,
  area_plan_pricings: AddAreaPlanPricings,
  service_product_ids: AddServices,
  addons: AddAddons,
  remove_services: RemoveServices,
  remove_addons: RemoveAddons,
  remove_area_plan_pricings: RemovePricingLevels,
};

const AreaData = () => (
  <AreaContext.Provider value="area_data">
    <Fields
      {...{ Edits }}
      dataField="area_data"
      fieldOptions={areaFieldOptions}
    />
  </AreaContext.Provider>
);

export default AreaData;
