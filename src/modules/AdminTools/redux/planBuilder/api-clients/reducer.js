import { createReducer } from '@/redux/root';
import {
  apiClientNameSpace,
  updatePlanBuilderApiClientAsync,
  createPlanBuilderApiClientAsync,
  removePlanBuilderApiClientAsync,
  requestPlanBuilderApiClientsAsync,
  clearPlanBuilderApiTokens,
} from './actions';
import { NAME } from './selectors';

export const planBuilderApiClientsReducer = {
  [NAME]: createReducer(
    apiClientNameSpace,
    {
      apiClients: [],
      newTokens: [],
      success: false,
    },
    {
      [updatePlanBuilderApiClientAsync.success]: ({
        state,
        action: {
          payload: { user, new_tokens },
        },
      }) => {
        state.apiClients.forEach(({ id }, index) => {
          if (id === user.id) {
            state.apiClients[index] = user;
          }
        });
        if (new_tokens.length > 0) {
          state.newTokens.push({
            user,
            new_tokens,
          });
        }
      },
      [createPlanBuilderApiClientAsync.success]: ({
        state,
        action: { payload },
      }) => {
        state.apiClients.push(payload);
      },
      [removePlanBuilderApiClientAsync.success]: ({
        state,
        action: { payload },
      }) => {
        state.apiClients = state.apiClients.filter(({ id }) => id !== payload);
      },
      [requestPlanBuilderApiClientsAsync.success]: ({
        state,
        action: { payload },
      }) => {
        state.apiClients = payload;
      },
      [clearPlanBuilderApiTokens.success]: ({ state }) => {
        state.newTokens = [];
      },
    }
  ),
};
