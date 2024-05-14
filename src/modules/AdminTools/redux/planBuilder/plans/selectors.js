import { createSelector } from 'reselect';

export const NAME = 'plans';

const basePlanSelector = (state) => state[NAME];

const empty_plan = {
  name: '',
};

export const plansSelector = createSelector(
  basePlanSelector,
  (plans) => plans?.plans || []
);

export const planSelector = createSelector(
  basePlanSelector,
  (plans) => plans?.plan || empty_plan
);

export const planMassUpdated = createSelector(
  basePlanSelector,
  (plans) => plans.massUpdate
);
