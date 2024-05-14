import {
  planCategoriesSelector,
  removePlanCategoryAsync,
  createPlanCategoryAsync,
  updatePlanCategoryAsync,
} from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/plan-categories';
import EditDataTable from '@/modules/AdminTools/components/EditDataTable';
import { planCategoryConstants } from '@/modules/AdminTools/lib/constants';

const { NAME, NAME_LABEL, ORDER, ORDER_LABEL } = planCategoryConstants;

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

const title = 'Plan Categories';

const defaultValues = {
  [NAME]: '',
  [ORDER]: 0,
};

const getSearchField = ({ name }) => name;

const searchPlaceholder = 'Search Plan Categories';

const PlanCategories = () => (
  <EditDataTable
    {...{
      sortOrders,
      searchPlaceholder,
      getSearchField,
      defaultValues,
      title,
      fields,
    }}
    updateAsync={updatePlanCategoryAsync}
    removeAsync={removePlanCategoryAsync}
    createAsync={createPlanCategoryAsync}
    selector={planCategoriesSelector}
  />
);

export default PlanCategories;
