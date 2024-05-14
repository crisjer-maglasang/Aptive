import { createSelector } from 'reselect';

export const NAME = 'planBuilderSettings';

export const settingsSelector = createSelector(
  (state) => state[NAME],
  (state) => state?.settings
);

export const settingsOptionsSelector = (name) =>
  createSelector(settingsSelector, (state) => state?.options[name]);
