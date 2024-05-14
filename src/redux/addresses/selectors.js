import { createSelector } from 'reselect';

export const selectCountries = (state) => state.addresses.countries;

export const selectStates = (state) => state.addresses.states;

export const allStatesSelector = createSelector(
  selectStates,
  (states) => {
    let allStates = [];

    Object.values(states).forEach((item) => {
      allStates = [...allStates, ...item];
    });

    return allStates;
  },
);
