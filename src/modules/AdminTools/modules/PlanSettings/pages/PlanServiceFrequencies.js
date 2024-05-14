import {
  planServiceFrequenciesSelector,
  removePlanServiceFrequencyAsync,
  createPlanServiceFrequencyAsync,
  updatePlanServiceFrequencyAsync,
} from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/plan-service-frequencies';
import EditDataTable from '@/modules/AdminTools/components/EditDataTable';
import { planServiceFrequencyConstants } from '@/modules/AdminTools/lib/constants';

const {
  ORDER,
  ORDER_LABEL,
  FREQUENCY,
  FREQUENCY_LABEL,
  DISPLAY,
  DISPLAY_LABEL,
} = planServiceFrequencyConstants;

const fields = [
  {
    label: FREQUENCY_LABEL,
    name: FREQUENCY,
    type: 'number',
    step: 1,
    min: 0,
    required: true,
  },
  {
    label: ORDER_LABEL,
    name: ORDER,
    type: 'number',
    step: 1,
    required: true,
  },
  {
    label: DISPLAY_LABEL,
    name: DISPLAY,
    type: 'text',
    required: true,
  },
];

const sortOrders = [FREQUENCY, ORDER];

const title = 'Service Frequencies';

const searchPlaceholder = 'Search Frequencies';

const defaultValues = {
  [ORDER]: 0,
  [FREQUENCY]: 0,
};

const getSearchField = ({ frequency }) => frequency;

const PlanServiceFrequencies = () => (
  <EditDataTable
    {...{
      sortOrders,
      searchPlaceholder,
      getSearchField,
      defaultValues,
      title,
      fields,
    }}
    updateAsync={updatePlanServiceFrequencyAsync}
    removeAsync={removePlanServiceFrequencyAsync}
    createAsync={createPlanServiceFrequencyAsync}
    selector={planServiceFrequenciesSelector}
  />
);

export default PlanServiceFrequencies;
