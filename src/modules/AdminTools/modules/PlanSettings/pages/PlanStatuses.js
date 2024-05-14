import {
  createPlanStatusAsync,
  planStatusesSelector,
  removePlanStatusAsync,
  updatePlanStatusAsync,
} from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/plan-statuses';
import EditDataTable from '@/modules/AdminTools/components/EditDataTable';
import { planStatusConstants } from '@/modules/AdminTools/lib/constants';

const { NAME, NAME_LABEL, ORDER, ORDER_LABEL } = planStatusConstants;

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

const title = 'Plan Statuses';

const defaultValues = {
  [NAME]: '',
  [ORDER]: 0,
};

const getSearchField = ({ name }) => name;

const searchPlaceholder = 'Search Plan Statuses';

const PlanStatuses = () => (
  <EditDataTable
    {...{
      sortOrders,
      searchPlaceholder,
      getSearchField,
      defaultValues,
      title,
      fields,
    }}
    updateAsync={updatePlanStatusAsync}
    removeAsync={removePlanStatusAsync}
    createAsync={createPlanStatusAsync}
    selector={planStatusesSelector}
  />
);

export default PlanStatuses;
