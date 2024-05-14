import { createSelector } from 'reselect';

export const NAME = 'data';

export const settingsSelector = (name) =>
  createSelector(
    (state) => state?.[name],
    (state) => state?.[NAME] || []
  );
