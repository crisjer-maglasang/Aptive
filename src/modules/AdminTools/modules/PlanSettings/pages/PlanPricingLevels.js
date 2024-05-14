import {
  planPricingLevelsSelector,
  removePlanPricingLevelAsync,
  createPlanPricingLevelAsync,
  updatePlanPricingLevelAsync,
} from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/plan-pricing-levels';
import EditDataTable from '@/modules/AdminTools/components/EditDataTable';
import { planPricingLevelConstants } from '@/modules/AdminTools/lib/constants';

const { NAME, NAME_LABEL, ORDER, ORDER_LABEL, SEARCH_PRICING_LEVEL } =
  planPricingLevelConstants;

const fields = [
  {
    label: NAME_LABEL,
    name: NAME,
    type: 'text',
    required: true,
  },
  {
    label: ORDER_LABEL,
    name: ORDER,
    type: 'number',
    step: 1,
    required: true,
  },
];

const sortOrders = [ORDER, NAME];

const title = 'Plan Pricing Levels';

const defaultValues = {
  [NAME]: '',
  [ORDER]: 0,
};

const getSearchField = ({ name }) => name;

const searchPlaceholder = SEARCH_PRICING_LEVEL;

const PlanPricingLevels = () => {
  return (
    <EditDataTable
      {...{
        sortOrders,
        searchPlaceholder,
        getSearchField,
        defaultValues,
        title,
        fields,
      }}
      updateAsync={updatePlanPricingLevelAsync}
      removeAsync={removePlanPricingLevelAsync}
      createAsync={createPlanPricingLevelAsync}
      selector={planPricingLevelsSelector}
    />
  );
};

export default PlanPricingLevels;
