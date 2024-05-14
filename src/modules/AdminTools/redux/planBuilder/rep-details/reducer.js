import { createReducer } from '@/redux/root';
import {
  repDetailsNameSpace,
  requestRepDetailsAsync,
  requestRepPlansAsync,
} from './actions';
import { NAME } from './selectors';

export const repDetailsReducer = {
  [NAME]: createReducer(
    repDetailsNameSpace,
    {
      plans: [],
      details: new Map(),
    },
    {
      [requestRepDetailsAsync.success]: ({ state, action: { payload } }) => {
        const details = new Map();

        if (Array.isArray(payload)) {
          payload.forEach((detail) => details.set(detail.rep_id, detail));
        }

        state.details = details;
      },
      [requestRepPlansAsync.success]: ({ state, action: { payload } }) => {
        state.plans = payload;
      },
    }
  ),
};
