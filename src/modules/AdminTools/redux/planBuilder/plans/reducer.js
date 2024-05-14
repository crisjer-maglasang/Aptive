import { createReducer } from '@/redux/root';
import {
  planNameSpace,
  requestPlansAsync,
  requestPlanAsync,
  updatePlanAsync,
  createPlanAsync,
  removePlanAsync,
  massUpdateAsync,
} from './actions';
import { NAME } from './selectors';

export const plansReducer = {
  [NAME]: createReducer(
    planNameSpace,
    {
      massUpdate: null,
    },
    {
      [requestPlansAsync.success]: ({ state, action: { payload } }) => {
        state.plans = payload;
      },
      [requestPlanAsync.success]: ({ state, action: { payload } }) => {
        state.plan = payload;
      },
      [updatePlanAsync.success]: ({ state, action: { payload } }) => {
        state.plan = payload;
        state.plans.forEach((plan, index) => {
          if (plan.id === payload.id) {
            state.plans[index] = payload;
          }
        });
      },
      [createPlanAsync.success]: ({ state, action: { payload } }) => {
        state.plan = payload;
        state.plans.push(payload);
      },
      [removePlanAsync.success]: ({ state, action: { payload } }) => {
        state.plans = state.plans.filter(({ id }) => id !== payload);
      },
      [massUpdateAsync.success]: ({ state, action: { payload } }) => {
        const { updated } = payload;
        state.massUpdate = { updated, time: +new Date() };
      },
    }
  ),
};
