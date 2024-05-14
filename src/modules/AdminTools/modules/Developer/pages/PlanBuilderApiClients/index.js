import { apiClientConstants, planBuilderConstants } from '@/modules/AdminTools/lib/constants';
import ApiClients from '../../components/ApiClients';
import {
  apiClientsSelector,
  createPlanBuilderApiClientAsync,
  apiClientTokensSelector,
  updatePlanBuilderApiClientAsync,
  removePlanBuilderApiClientAsync,
} from '@/modules/AdminTools/redux/planBuilder/api-clients';
import { updatingPlanAPIClientLoadingSelector } from '@/redux/loading';

const { API_CLIENT_NAME } = apiClientConstants;
const { API_CLIENTS } = planBuilderConstants;

const PlanBuilderApiClients = () => {
  return (
    <ApiClients
      {...{ apiClientsSelector, API_CLIENT_NAME, apiClientTokensSelector }}
      title={API_CLIENTS}
      createApiClientAsync={createPlanBuilderApiClientAsync}
      updateApiClientAsync={updatePlanBuilderApiClientAsync}
      removeApiClientAsync={removePlanBuilderApiClientAsync}
      updateApiSelector={updatingPlanAPIClientLoadingSelector}
    />
  );
};

export default PlanBuilderApiClients;
