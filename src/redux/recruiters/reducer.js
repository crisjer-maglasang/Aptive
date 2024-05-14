import { createReducer } from '@/redux/root';
import { keyBy } from 'lodash-es';
import { logoutAction } from '../auth';
import {
  nameSpace,
  requestRecruitersAsync,
  requestRecruiterManagersAsync,
  requestRecruitingOfficesAsync,
} from './actions';

const initialState = {
  recruiters: [],
  recruitingOffices: [],
};

export const recruitersReducer = createReducer(nameSpace, initialState, {
  [requestRecruitersAsync.success]: ({ state, action }) => {
    const { items } = action.payload;

    state.recruiters = items;
  },

  [requestRecruiterManagersAsync.success]: ({ state, action }) => {
    const { recruiterId, items } = action.payload;

    state.recruiters = state.recruiters.map((recruiter) => (
      recruiter.value === recruiterId
        ? { ...recruiter, managers: keyBy(items, 'role') }
        : recruiter
    ));
  },

  [requestRecruitingOfficesAsync.success]: ({ state, action }) => {
    const { items } = action.payload;

    state.recruitingOffices = items;
  },

  [logoutAction]: ({ state }) => {
    state.recruiters = initialState.recruiters;
    state.recruitingOffices = initialState.recruitingOffices;
  },
});
