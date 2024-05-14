import { createSelector } from 'reselect';

export const NAME = 'planBuilderApiClient';

const baseSelector = (state) => state[NAME];

export const apiClientsSelector = createSelector(
  baseSelector,
  (state) => state.apiClients
);

export const apiClientTokensSelector = createSelector(
  baseSelector,
  (state) => state.newTokens
);
